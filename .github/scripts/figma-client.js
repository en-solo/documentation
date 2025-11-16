/**
 * Figma API Client
 * Handles all interactions with the Figma REST API
 */

const https = require('https');

class FigmaClient {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.baseUrl = 'api.figma.com';
  }

  /**
   * Make a request to Figma API
   */
  async request(path) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: this.baseUrl,
        path,
        method: 'GET',
        headers: {
          'X-Figma-Token': this.accessToken
        }
      };

      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve(JSON.parse(data));
            } catch (error) {
              reject(new Error(`Failed to parse response: ${error.message}`));
            }
          } else {
            reject(new Error(`Figma API error (${res.statusCode}): ${data}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(new Error(`Request failed: ${error.message}`));
      });

      req.end();
    });
  }

  /**
   * Download binary data (for images)
   */
  async downloadBinary(url) {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        const chunks = [];

        res.on('data', (chunk) => {
          chunks.push(chunk);
        });

        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(Buffer.concat(chunks));
          } else {
            reject(new Error(`Download failed (${res.statusCode})`));
          }
        });
      }).on('error', (error) => {
        reject(new Error(`Download error: ${error.message}`));
      });
    });
  }

  /**
   * Get a specific node from a Figma file
   */
  async getNode(fileId, nodeId) {
    const path = `/v1/files/${fileId}/nodes?ids=${encodeURIComponent(nodeId)}`;
    const response = await this.request(path);

    if (!response.nodes || !response.nodes[nodeId]) {
      return null;
    }

    return {
      name: response.name,
      lastModified: response.lastModified,
      document: response.nodes[nodeId].document
    };
  }

  /**
   * Export an image from Figma
   */
  async exportImage(fileId, nodeId, options = {}) {
    const format = options.format || 'png';
    const scale = options.scale || 2;

    // Get image URL from Figma
    const path = `/v1/images/${fileId}?ids=${encodeURIComponent(nodeId)}&format=${format}&scale=${scale}`;
    const response = await this.request(path);

    if (!response.images || !response.images[nodeId]) {
      throw new Error('Failed to get image URL from Figma');
    }

    const imageUrl = response.images[nodeId];

    // Download the image
    return await this.downloadBinary(imageUrl);
  }

  /**
   * Extract design specifications from a Figma node
   */
  extractSpecifications(node) {
    const specs = {
      spacing: this.extractSpacing(node),
      colors: this.extractColors(node),
      typography: this.extractTypography(node),
      layout: this.extractLayout(node),
      effects: this.extractEffects(node)
    };

    // Filter out empty sections
    return Object.fromEntries(
      Object.entries(specs).filter(([_, value]) => Object.keys(value).length > 0)
    );
  }

  /**
   * Extract spacing information
   */
  extractSpacing(node) {
    const spacing = {};

    if (node.paddingLeft !== undefined) {
      spacing.padding = {
        top: node.paddingTop || 0,
        right: node.paddingRight || 0,
        bottom: node.paddingBottom || 0,
        left: node.paddingLeft || 0
      };
    }

    if (node.itemSpacing !== undefined) {
      spacing.gap = node.itemSpacing;
    }

    if (node.layoutMode) {
      spacing.layout = node.layoutMode; // HORIZONTAL or VERTICAL
    }

    return spacing;
  }

  /**
   * Extract color information
   */
  extractColors(node) {
    const colors = {};

    // Background color
    if (node.backgroundColor) {
      colors.background = this.rgbaToHex(node.backgroundColor);
    }

    // Fill colors
    if (node.fills && node.fills.length > 0) {
      const fills = node.fills
        .filter(fill => fill.visible !== false && fill.type === 'SOLID')
        .map(fill => this.rgbaToHex(fill.color, fill.opacity));

      if (fills.length > 0) {
        colors.fills = fills;
      }
    }

    // Stroke colors
    if (node.strokes && node.strokes.length > 0) {
      const strokes = node.strokes
        .filter(stroke => stroke.visible !== false && stroke.type === 'SOLID')
        .map(stroke => ({
          color: this.rgbaToHex(stroke.color, stroke.opacity),
          weight: node.strokeWeight
        }));

      if (strokes.length > 0) {
        colors.strokes = strokes;
      }
    }

    return colors;
  }

  /**
   * Extract typography information
   */
  extractTypography(node) {
    const typography = {};

    if (node.style) {
      const style = node.style;

      if (style.fontFamily) typography.fontFamily = style.fontFamily;
      if (style.fontWeight) typography.fontWeight = style.fontWeight;
      if (style.fontSize) typography.fontSize = `${style.fontSize}px`;
      if (style.lineHeightPx) {
        typography.lineHeight = style.lineHeightPercent
          ? `${style.lineHeightPercent}%`
          : `${style.lineHeightPx}px`;
      }
      if (style.letterSpacing) typography.letterSpacing = `${style.letterSpacing}px`;
      if (style.textAlignHorizontal) typography.textAlign = style.textAlignHorizontal.toLowerCase();
    }

    // Text content (if it's a text node)
    if (node.characters) {
      typography.content = node.characters;
    }

    return typography;
  }

  /**
   * Extract layout information
   */
  extractLayout(node) {
    const layout = {};

    if (node.absoluteBoundingBox) {
      const box = node.absoluteBoundingBox;
      layout.width = Math.round(box.width);
      layout.height = Math.round(box.height);
    }

    if (node.constraints) {
      layout.constraints = node.constraints;
    }

    if (node.layoutAlign) {
      layout.align = node.layoutAlign;
    }

    if (node.layoutGrow !== undefined) {
      layout.grow = node.layoutGrow;
    }

    return layout;
  }

  /**
   * Extract effects (shadows, blurs)
   */
  extractEffects(node) {
    const effects = {};

    if (node.effects && node.effects.length > 0) {
      const shadows = node.effects
        .filter(effect => effect.visible !== false && effect.type.includes('SHADOW'))
        .map(effect => ({
          type: effect.type.toLowerCase().replace('_', '-'),
          color: this.rgbaToHex(effect.color),
          offset: { x: effect.offset.x, y: effect.offset.y },
          radius: effect.radius,
          spread: effect.spread || 0
        }));

      if (shadows.length > 0) {
        effects.shadows = shadows;
      }

      const blurs = node.effects
        .filter(effect => effect.visible !== false && effect.type.includes('BLUR'))
        .map(effect => ({
          type: effect.type.toLowerCase().replace('_', '-'),
          radius: effect.radius
        }));

      if (blurs.length > 0) {
        effects.blurs = blurs;
      }
    }

    if (node.cornerRadius !== undefined) {
      effects.borderRadius = node.cornerRadius;
    }

    if (node.opacity !== undefined && node.opacity !== 1) {
      effects.opacity = node.opacity;
    }

    return effects;
  }

  /**
   * Convert RGBA color object to hex string
   */
  rgbaToHex(color, opacity = 1) {
    const r = Math.round((color.r || 0) * 255);
    const g = Math.round((color.g || 0) * 255);
    const b = Math.round((color.b || 0) * 255);
    const a = color.a !== undefined ? color.a : 1;
    const finalOpacity = a * opacity;

    const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

    if (finalOpacity < 1) {
      return `${hex} (${Math.round(finalOpacity * 100)}%)`;
    }

    return hex;
  }
}

module.exports = { FigmaClient };
