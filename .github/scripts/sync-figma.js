#!/usr/bin/env node

/**
 * Figma Sync Script
 * Scans MDX files for Figma frame references, checks for updates,
 * and syncs screenshots and specifications.
 */

const fs = require('fs').promises;
const path = require('path');
const { FigmaClient } = require('./figma-client');
const { MetadataTracker } = require('./metadata-tracker');
const { MDXUpdater } = require('./mdx-updater');

const DOCS_DIR = path.join(__dirname, '../../');
const IMAGES_DIR = path.join(DOCS_DIR, 'images/figma');
const METADATA_FILE = path.join(__dirname, 'figma-sync-metadata.json');

// Regex to match Figma frame comments: <!-- figma-frame: FILE_ID/NODE_ID -->
const FIGMA_FRAME_REGEX = /<!--\s*figma-frame:\s*([^/\s]+)\/([^-\s]+)\s*-->/g;

class FigmaSync {
  constructor() {
    this.figmaToken = process.env.FIGMA_ACCESS_TOKEN;
    this.forceUpdate = process.env.FORCE_UPDATE === 'true';

    if (!this.figmaToken) {
      throw new Error('FIGMA_ACCESS_TOKEN environment variable is required');
    }

    this.figmaClient = new FigmaClient(this.figmaToken);
    this.metadataTracker = new MetadataTracker(METADATA_FILE);
    this.mdxUpdater = new MDXUpdater();
    this.updatedFrames = [];
  }

  /**
   * Main sync process
   */
  async sync() {
    console.log('🚀 Starting Figma sync...\n');

    try {
      // Ensure images directory exists
      await fs.mkdir(IMAGES_DIR, { recursive: true });

      // Load metadata from previous runs
      await this.metadataTracker.load();

      // Scan all MDX files for Figma frame references
      const mdxFiles = await this.findMDXFiles(DOCS_DIR);
      console.log(`📄 Found ${mdxFiles.length} MDX files to scan\n`);

      const frameReferences = await this.scanForFigmaFrames(mdxFiles);
      console.log(`🔍 Found ${frameReferences.length} Figma frame references\n`);

      if (frameReferences.length === 0) {
        console.log('ℹ️  No Figma frames to sync');
        return;
      }

      // Process each frame reference
      for (const ref of frameReferences) {
        await this.processFrame(ref);
      }

      // Save updated metadata
      await this.metadataTracker.save();

      // Summary
      if (this.updatedFrames.length > 0) {
        console.log(`\n✅ Sync complete! Updated ${this.updatedFrames.length} frame(s):`);
        this.updatedFrames.forEach(frame => {
          console.log(`   - ${frame.filePath} (${frame.fileId}/${frame.nodeId})`);
        });
      } else {
        console.log('\nℹ️  No frames required updates. All documentation is current.');
      }

    } catch (error) {
      console.error('❌ Sync failed:', error.message);
      throw error;
    }
  }

  /**
   * Recursively find all MDX files
   */
  async findMDXFiles(dir) {
    const files = [];
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      // Skip node_modules, .git, and other hidden directories
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        const subFiles = await this.findMDXFiles(fullPath);
        files.push(...subFiles);
      } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
        files.push(fullPath);
      }
    }

    return files;
  }

  /**
   * Scan MDX files for Figma frame references
   */
  async scanForFigmaFrames(mdxFiles) {
    const references = [];

    for (const filePath of mdxFiles) {
      const content = await fs.readFile(filePath, 'utf-8');
      const matches = [...content.matchAll(FIGMA_FRAME_REGEX)];

      for (const match of matches) {
        const [fullMatch, fileId, nodeId] = match;
        references.push({
          filePath,
          fileId,
          nodeId,
          comment: fullMatch
        });
      }
    }

    return references;
  }

  /**
   * Process a single Figma frame
   */
  async processFrame(ref) {
    const { filePath, fileId, nodeId } = ref;
    const frameKey = `${fileId}/${nodeId}`;

    console.log(`\n📦 Processing: ${frameKey}`);
    console.log(`   File: ${path.relative(DOCS_DIR, filePath)}`);

    try {
      // Get frame data from Figma
      const frameData = await this.figmaClient.getNode(fileId, nodeId);

      if (!frameData) {
        console.log(`   ⚠️  Frame not found or inaccessible`);
        return;
      }

      // Check if frame was modified since last sync
      const lastModified = frameData.document.lastModified;
      const needsUpdate = this.shouldUpdate(frameKey, lastModified);

      if (!needsUpdate && !this.forceUpdate) {
        console.log(`   ✓ Up to date (last modified: ${new Date(lastModified).toISOString()})`);
        return;
      }

      console.log(`   🔄 Updating (${this.forceUpdate ? 'forced' : 'modified'})`);

      // Export screenshot
      const imagePath = await this.exportScreenshot(fileId, nodeId, frameData.name);
      console.log(`   📸 Screenshot saved: ${path.relative(DOCS_DIR, imagePath)}`);

      // Extract specifications
      const specs = this.figmaClient.extractSpecifications(frameData.document);
      console.log(`   📐 Extracted specifications`);

      // Update MDX file
      const relativeImagePath = path.relative(path.dirname(filePath), imagePath);
      await this.mdxUpdater.updateFrame(filePath, ref.comment, {
        imagePath: relativeImagePath,
        specs,
        frameName: frameData.name
      });
      console.log(`   ✏️  Updated MDX file`);

      // Update metadata
      this.metadataTracker.update(frameKey, {
        lastModified,
        lastSynced: new Date().toISOString(),
        frameName: frameData.name,
        filePath: path.relative(DOCS_DIR, filePath)
      });

      this.updatedFrames.push({ filePath, fileId, nodeId });

    } catch (error) {
      console.error(`   ❌ Error processing frame: ${error.message}`);
    }
  }

  /**
   * Check if frame needs update
   */
  shouldUpdate(frameKey, lastModified) {
    const metadata = this.metadataTracker.get(frameKey);

    if (!metadata) {
      return true; // New frame, needs initial sync
    }

    return new Date(lastModified) > new Date(metadata.lastModified);
  }

  /**
   * Export screenshot from Figma
   */
  async exportScreenshot(fileId, nodeId, frameName) {
    const imageBuffer = await this.figmaClient.exportImage(fileId, nodeId, {
      format: 'png',
      scale: 2
    });

    // Create safe filename
    const safeFrameName = frameName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const filename = `${fileId}-${nodeId}-${safeFrameName}.png`;
    const imagePath = path.join(IMAGES_DIR, filename);

    await fs.writeFile(imagePath, imageBuffer);

    return imagePath;
  }
}

// Run sync
(async () => {
  try {
    const sync = new FigmaSync();
    await sync.sync();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
})();
