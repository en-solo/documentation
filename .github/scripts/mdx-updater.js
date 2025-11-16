/**
 * MDX Updater
 * Updates MDX files with Figma screenshots and specifications
 */

const fs = require('fs').promises;

class MDXUpdater {
  /**
   * Update a Figma frame section in an MDX file
   */
  async updateFrame(filePath, figmaComment, data) {
    const { imagePath, specs, frameName } = data;

    // Read the current file content
    let content = await fs.readFile(filePath, 'utf-8');

    // Find the figma comment position
    const commentIndex = content.indexOf(figmaComment);
    if (commentIndex === -1) {
      throw new Error(`Figma comment not found in ${filePath}`);
    }

    // Generate the new content block
    const contentBlock = this.generateContentBlock(imagePath, specs, frameName);

    // Check if there's already a content block after the comment
    const existingBlockRegex = new RegExp(
      `${this.escapeRegex(figmaComment)}[\\s\\S]*?(?=<!--\\s*figma-frame:|<!--\\s*\\/figma-sync\\s*-->|$)`,
      'g'
    );

    // Replace or insert the content block
    if (content.includes('<!-- /figma-sync -->')) {
      // There's an existing block with end marker
      content = content.replace(
        new RegExp(
          `${this.escapeRegex(figmaComment)}[\\s\\S]*?<!--\\s*\\/figma-sync\\s*-->`,
          'g'
        ),
        `${figmaComment}\n\n${contentBlock}\n\n<!-- /figma-sync -->`
      );
    } else {
      // Insert new block after the comment
      content = content.replace(
        figmaComment,
        `${figmaComment}\n\n${contentBlock}\n\n<!-- /figma-sync -->`
      );
    }

    // Write the updated content back to the file
    await fs.writeFile(filePath, content, 'utf-8');
  }

  /**
   * Generate the content block with image and specifications
   */
  generateContentBlock(imagePath, specs, frameName) {
    const blocks = [];

    // Add frame title if available
    if (frameName) {
      blocks.push(`### ${frameName}\n`);
    }

    // Add image
    blocks.push(`<Frame>\n  ![${frameName || 'Figma design'}](${imagePath})\n</Frame>\n`);

    // Add specifications if available
    if (specs && Object.keys(specs).length > 0) {
      blocks.push('<AccordionGroup>');

      // Spacing specifications
      if (specs.spacing) {
        blocks.push(this.createAccordion('Spacing', this.formatSpacing(specs.spacing)));
      }

      // Color specifications
      if (specs.colors) {
        blocks.push(this.createAccordion('Colors', this.formatColors(specs.colors)));
      }

      // Typography specifications
      if (specs.typography) {
        blocks.push(this.createAccordion('Typography', this.formatTypography(specs.typography)));
      }

      // Layout specifications
      if (specs.layout) {
        blocks.push(this.createAccordion('Layout', this.formatLayout(specs.layout)));
      }

      // Effects specifications
      if (specs.effects) {
        blocks.push(this.createAccordion('Effects', this.formatEffects(specs.effects)));
      }

      blocks.push('</AccordionGroup>');
    }

    return blocks.join('\n\n');
  }

  /**
   * Create an accordion component
   */
  createAccordion(title, content) {
    return `  <Accordion title="${title}">\n${content}\n  </Accordion>`;
  }

  /**
   * Format spacing specifications
   */
  formatSpacing(spacing) {
    const items = [];

    if (spacing.padding) {
      const p = spacing.padding;
      items.push(`**Padding**: ${p.top}px ${p.right}px ${p.bottom}px ${p.left}px`);
    }

    if (spacing.gap !== undefined) {
      items.push(`**Gap**: ${spacing.gap}px`);
    }

    if (spacing.layout) {
      items.push(`**Layout**: ${spacing.layout.toLowerCase()}`);
    }

    return this.formatList(items);
  }

  /**
   * Format color specifications
   */
  formatColors(colors) {
    const items = [];

    if (colors.background) {
      items.push(`**Background**: \`${colors.background}\``);
    }

    if (colors.fills && colors.fills.length > 0) {
      items.push(`**Fills**: ${colors.fills.map(c => `\`${c}\``).join(', ')}`);
    }

    if (colors.strokes && colors.strokes.length > 0) {
      const strokes = colors.strokes.map(s => `\`${s.color}\` (${s.weight}px)`).join(', ');
      items.push(`**Strokes**: ${strokes}`);
    }

    return this.formatList(items);
  }

  /**
   * Format typography specifications
   */
  formatTypography(typography) {
    const items = [];

    if (typography.fontFamily) {
      items.push(`**Font Family**: ${typography.fontFamily}`);
    }

    if (typography.fontWeight) {
      items.push(`**Font Weight**: ${typography.fontWeight}`);
    }

    if (typography.fontSize) {
      items.push(`**Font Size**: ${typography.fontSize}`);
    }

    if (typography.lineHeight) {
      items.push(`**Line Height**: ${typography.lineHeight}`);
    }

    if (typography.letterSpacing) {
      items.push(`**Letter Spacing**: ${typography.letterSpacing}`);
    }

    if (typography.textAlign) {
      items.push(`**Text Align**: ${typography.textAlign}`);
    }

    if (typography.content) {
      items.push(`**Content**: "${typography.content}"`);
    }

    return this.formatList(items);
  }

  /**
   * Format layout specifications
   */
  formatLayout(layout) {
    const items = [];

    if (layout.width !== undefined) {
      items.push(`**Width**: ${layout.width}px`);
    }

    if (layout.height !== undefined) {
      items.push(`**Height**: ${layout.height}px`);
    }

    if (layout.constraints) {
      items.push(`**Constraints**: ${JSON.stringify(layout.constraints)}`);
    }

    if (layout.align) {
      items.push(`**Align**: ${layout.align}`);
    }

    if (layout.grow !== undefined) {
      items.push(`**Grow**: ${layout.grow}`);
    }

    return this.formatList(items);
  }

  /**
   * Format effects specifications
   */
  formatEffects(effects) {
    const items = [];

    if (effects.shadows && effects.shadows.length > 0) {
      effects.shadows.forEach((shadow, i) => {
        items.push(
          `**Shadow ${i + 1}**: \`${shadow.color}\` offset(${shadow.offset.x}px, ${shadow.offset.y}px) blur(${shadow.radius}px) spread(${shadow.spread}px)`
        );
      });
    }

    if (effects.blurs && effects.blurs.length > 0) {
      effects.blurs.forEach((blur, i) => {
        items.push(`**Blur ${i + 1}**: ${blur.type} (${blur.radius}px)`);
      });
    }

    if (effects.borderRadius !== undefined) {
      items.push(`**Border Radius**: ${effects.borderRadius}px`);
    }

    if (effects.opacity !== undefined) {
      items.push(`**Opacity**: ${Math.round(effects.opacity * 100)}%`);
    }

    return this.formatList(items);
  }

  /**
   * Format items as a markdown list with proper indentation
   */
  formatList(items) {
    if (items.length === 0) {
      return '    No specifications available.';
    }

    return items.map(item => `    - ${item}`).join('\n');
  }

  /**
   * Escape special regex characters
   */
  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

module.exports = { MDXUpdater };
