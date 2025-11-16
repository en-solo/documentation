/**
 * Metadata Tracker
 * Tracks sync metadata for Figma frames to detect changes
 */

const fs = require('fs').promises;

class MetadataTracker {
  constructor(metadataPath) {
    this.metadataPath = metadataPath;
    this.metadata = {};
  }

  /**
   * Load metadata from file
   */
  async load() {
    try {
      const data = await fs.readFile(this.metadataPath, 'utf-8');
      this.metadata = JSON.parse(data);
    } catch (error) {
      // File doesn't exist yet, start with empty metadata
      if (error.code === 'ENOENT') {
        this.metadata = {};
      } else {
        throw error;
      }
    }
  }

  /**
   * Save metadata to file
   */
  async save() {
    const data = JSON.stringify(this.metadata, null, 2);
    await fs.writeFile(this.metadataPath, data, 'utf-8');
  }

  /**
   * Get metadata for a frame
   */
  get(frameKey) {
    return this.metadata[frameKey];
  }

  /**
   * Update metadata for a frame
   */
  update(frameKey, data) {
    this.metadata[frameKey] = {
      ...this.metadata[frameKey],
      ...data
    };
  }

  /**
   * Remove metadata for a frame
   */
  remove(frameKey) {
    delete this.metadata[frameKey];
  }

  /**
   * Get all metadata
   */
  getAll() {
    return this.metadata;
  }

  /**
   * Clear all metadata
   */
  clear() {
    this.metadata = {};
  }
}

module.exports = { MetadataTracker };
