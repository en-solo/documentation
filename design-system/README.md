# Design System Documentation

This directory contains all design system documentation for your Mintlify site.

## Directory Structure

```
design-system/
├── README.md                          # This file
├── FIGMA_DOCUMENTATION_GUIDE.md      # Step-by-step guide for documenting Figma components
├── overview.mdx                       # Design system landing page
│
├── foundations/                       # Design foundations
│   ├── colors.mdx                    # Color palette and usage
│   ├── typography.mdx                # Font system and text styles
│   ├── spacing.mdx                   # Spacing scale and layout grid
│   ├── shadows.mdx                   # Shadow and elevation system
│   └── design-tokens.mdx             # Complete token reference
│
├── components/                        # UI components
│   ├── _template.mdx                 # Template for new components
│   └── buttons.mdx                   # Example: Button component
│
└── patterns/                          # Design patterns
    └── layouts.mdx                    # Common layout patterns
```

## Quick Start

### 1. View the Documentation Locally

```bash
# Install Mintlify CLI (if not already installed)
npm i -g mintlify

# Start the dev server
mint dev

# Visit http://localhost:3000 and navigate to "Design System" tab
```

### 2. Document a Component from Figma

Follow these steps to add a new component:

1. **Read the guide**: Open `FIGMA_DOCUMENTATION_GUIDE.md` for detailed instructions
2. **Copy the template**: Duplicate `components/_template.mdx`
3. **Export from Figma**: Save component screenshots to `/images/design-system/components/`
4. **Fill in specifications**: Replace template placeholders with your Figma specs
5. **Add to navigation**: Register the page in `docs.json`
6. **Test**: Run `mint dev` to preview

### 3. Update Design Tokens

When your Figma design changes:

1. Update values in `foundations/design-tokens.mdx`
2. Update specific foundation pages (colors, spacing, etc.)
3. Commit changes to keep documentation in sync with design

## What to Document

### ✅ Already Created (Templates)

- [x] Design system overview
- [x] Color system
- [x] Typography system
- [x] Spacing/grid system
- [x] Shadow/elevation system
- [x] Design tokens reference
- [x] Button component (example)
- [x] Layout patterns
- [x] Component template

### 📝 Ready to Add (From Your Figma)

Fill in the templates with your actual Figma values:

**Foundations** (Update existing pages):
- [ ] Add your actual color palette
- [ ] Add your typography scale
- [ ] Add your spacing values
- [ ] Add your shadow definitions
- [ ] Export and add design tokens

**Components** (Create new pages from template):
- [ ] Inputs (text, email, password)
- [ ] Textareas
- [ ] Select/Dropdowns
- [ ] Checkboxes
- [ ] Radio buttons
- [ ] Toggles/Switches
- [ ] Cards
- [ ] Modals/Dialogs
- [ ] Navigation
- [ ] Tables
- [ ] Icons
- [ ] Badges/Tags
- [ ] Tooltips
- [ ] Alerts/Notifications
- [ ] ... and more

## File Naming Conventions

- **MDX files**: Use kebab-case (e.g., `text-input.mdx`, `dropdown-menu.mdx`)
- **Images**: Use descriptive names (e.g., `button-primary-hover.png`)
- **Directories**: Use plural for component categories (e.g., `components/`, `patterns/`)

## Writing Guidelines

### Component Documentation Should Include:

1. **Overview**: What is it, when to use it
2. **Variants**: All visual variations
3. **States**: Default, hover, active, focus, disabled, etc.
4. **Sizes**: All size options with specs
5. **Specifications**: Exact measurements from Figma
6. **Usage guidelines**: Do's and don'ts
7. **Accessibility**: Keyboard, screen readers, WCAG compliance
8. **Code examples**: Reference implementation
9. **Related components**: Links to similar components

### Best Practices:

- ✅ Use design tokens instead of hard-coded values
- ✅ Include visual examples (screenshots from Figma)
- ✅ Provide real-world use cases
- ✅ Document edge cases and responsive behavior
- ✅ Maintain consistent formatting across all pages
- ❌ Don't use subjective descriptions like "looks nice"
- ❌ Don't skip accessibility documentation
- ❌ Don't forget to add images

## Images

Store component images in organized subdirectories:

```
/images/design-system/
├── components/
│   ├── button/
│   │   ├── primary.png
│   │   ├── secondary.png
│   │   ├── hover-state.png
│   │   └── disabled-state.png
│   ├── input/
│   │   ├── default.png
│   │   ├── error.png
│   │   └── success.png
│   └── ...
├── foundations/
│   ├── color-palette.png
│   └── typography-scale.png
└── patterns/
    └── layout-examples.png
```

## Navigation Management

To add a new page, register it in `/docs.json`:

```json
{
  "group": "Components",
  "pages": [
    "design-system/components/buttons",
    "design-system/components/your-new-component"
  ]
}
```

Pages appear in the navigation in the order they're listed.

## Mintlify Components Available

You can use these Mintlify components in your MDX files:

- `<Card>`, `<CardGroup>`: Card layouts
- `<Accordion>`, `<AccordionGroup>`: Collapsible sections
- `<Tabs>`, `<Tab>`: Tabbed content
- `<Steps>`, `<Step>`: Numbered steps
- `<Frame>`: Image frames
- `<Tip>`, `<Note>`, `<Info>`, `<Warning>`: Callout boxes
- `<Columns>`: Multi-column layouts

See `/essentials/markdown.mdx` for examples.

## Workflow Example

Here's a typical workflow for documenting a new component:

```bash
# 1. Export images from Figma
# Save to: /images/design-system/components/tooltip/

# 2. Create the documentation file
cp design-system/components/_template.mdx design-system/components/tooltip.mdx

# 3. Edit the file
# - Update frontmatter
# - Fill in specifications from Figma
# - Add image references
# - Write usage guidelines

# 4. Register in navigation
# Edit docs.json and add "design-system/components/tooltip"

# 5. Preview
mint dev

# 6. Commit when ready
git add .
git commit -m "Add tooltip component documentation"
```

## Need Help?

- **Mintlify docs**: https://mintlify.com/docs
- **Component template**: `design-system/components/_template.mdx`
- **Figma guide**: `FIGMA_DOCUMENTATION_GUIDE.md`
- **CLAUDE.md**: Project-specific instructions in root directory

## Next Steps

1. **Start with Foundations**: Update the existing foundation pages with your actual Figma values
2. **Pick a Simple Component**: Document a button or input to get familiar with the process
3. **Build Out Components**: Work through your Figma component library systematically
4. **Maintain Regularly**: Keep documentation updated as designs evolve

---

**Questions or issues?** Refer to `FIGMA_DOCUMENTATION_GUIDE.md` for detailed instructions or check the Mintlify documentation.
