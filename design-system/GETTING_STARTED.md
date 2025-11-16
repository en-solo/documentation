# Getting Started with Design System Documentation

Welcome! Your Mintlify design system documentation is now set up and ready for you to populate with your Figma components.

## What's Been Created

### ✅ Complete Structure

```
design-system/
├── 📄 README.md                           # Directory overview
├── 📄 GETTING_STARTED.md                  # This file
├── 📄 FIGMA_DOCUMENTATION_GUIDE.md       # Detailed how-to guide
├── 📄 CHECKLIST.md                        # Progress tracker
│
├── 📄 overview.mdx                        # Landing page
│
├── 📁 foundations/
│   ├── colors.mdx                        # Color system ⚠️ FILL IN
│   ├── typography.mdx                    # Type system ⚠️ FILL IN
│   ├── spacing.mdx                       # Spacing & grid ⚠️ FILL IN
│   ├── shadows.mdx                       # Elevation system ⚠️ FILL IN
│   └── design-tokens.mdx                 # Token reference ⚠️ FILL IN
│
├── 📁 components/
│   ├── _template.mdx                     # Template for new components
│   └── buttons.mdx                       # Example component ⚠️ UPDATE
│
└── 📁 patterns/
    └── layouts.mdx                        # Layout patterns ⚠️ UPDATE

/images/design-system/
├── components/                            # Component screenshots
├── foundations/                           # Foundation examples
└── patterns/                              # Pattern examples
```

### ✅ Navigation Configured

A new "Design System" tab has been added to your Mintlify site with:
- Overview page
- Foundations section (5 pages)
- Components section (1 example)
- Patterns section (1 page)

## Next Steps

### Step 1: View What's Been Created (5 minutes)

```bash
# Start the dev server
mint dev

# Visit http://localhost:3000
# Click on "Design System" tab
# Browse through the pages to see the structure
```

You'll see fully-formatted template pages ready to be filled in with your Figma data.

### Step 2: Update Foundations FIRST (1-2 hours)

**This is the most important step!** Update the foundation pages with your actual Figma values.

#### Colors (`foundations/colors.mdx`)

1. Open Figma → Go to your color styles/variables
2. For each color, note:
   - Name (e.g., "Primary 500")
   - Hex value
   - RGB value
   - Usage (where it's used)
3. Open `design-system/foundations/colors.mdx`
4. Replace all `#EXAMPLE` placeholders with your actual hex values
5. Update the usage descriptions

#### Typography (`foundations/typography.mdx`)

1. In Figma, check your text styles
2. Note:
   - Font family name
   - All font sizes used
   - Font weights available
   - Line heights
3. Update the page with your actual values

#### Spacing (`foundations/spacing.mdx`)

1. Check if you use 8px grid (most systems do)
2. Verify the spacing scale matches your designs
3. Update component padding examples
4. Document your grid system

#### Shadows (`foundations/shadows.mdx`)

1. In Figma, select a component with shadow
2. Copy the shadow values
3. Update the shadow tokens in the page
4. Repeat for all shadow levels

#### Design Tokens (`foundations/design-tokens.mdx`)

1. If you use Figma variables, export them
2. Fill in all token values
3. This becomes your single source of truth

**Time estimate**: 1-2 hours to properly document all foundations

### Step 3: Document Your First Component (30 minutes)

Let's start with a simple component like a Button:

1. **Export from Figma**:
   ```
   - Select your button component
   - Export as PNG at 2x
   - Save multiple variants (primary, secondary, etc.)
   - Save states (default, hover, active, disabled)
   - Place in: /images/design-system/components/button/
   ```

2. **Update the buttons.mdx file**:
   ```bash
   # Open: design-system/components/buttons.mdx
   # Replace example values with your actual Figma specs
   # Add your exported images
   ```

3. **Test**:
   ```bash
   mint dev
   # Navigate to Design System → Components → Buttons
   # Verify everything looks correct
   ```

### Step 4: Document More Components (Ongoing)

Once you're comfortable with the process:

1. Open `CHECKLIST.md` to see all recommended components
2. For each component:
   - Copy `_template.mdx`
   - Export images from Figma
   - Fill in specifications
   - Add to `docs.json` navigation
   - Test locally

**Use this workflow**:
```bash
# 1. Copy template
cp design-system/components/_template.mdx design-system/components/input.mdx

# 2. Edit the file with your Figma specs
# 3. Export images to /images/design-system/components/input/
# 4. Add to docs.json
# 5. Preview
mint dev
```

## Helpful Resources

### Files to Reference

1. **`FIGMA_DOCUMENTATION_GUIDE.md`** - Complete step-by-step guide
2. **`_template.mdx`** - Copy this for every new component
3. **`buttons.mdx`** - Example of a completed component (needs your data)
4. **`CHECKLIST.md`** - Track your progress

### Mintlify Components You Can Use

Your MDX files support these special components:

```mdx
<Card title="Title" icon="icon-name">
  Content
</Card>

<Accordion title="Title">
  Collapsible content
</Accordion>

<Tabs>
  <Tab title="Tab 1">Content 1</Tab>
  <Tab title="Tab 2">Content 2</Tab>
</Tabs>

<Tip>Helpful tip</Tip>
<Note>Important note</Note>
<Warning>Warning message</Warning>
<Info>Information</Info>

<Frame>
  <img src="/path/to/image.png" alt="Description" />
</Frame>
```

See examples in the existing pages!

## Common Questions

### Q: Do I need to document every single component?

**A**: Start with the most commonly used components (buttons, inputs, cards) and build from there. You can always add more later.

### Q: What if my Figma file doesn't have all states documented?

**A**: This is a great opportunity to improve your Figma file! Document what exists, and note what's missing.

### Q: Can I modify the templates?

**A**: Absolutely! The templates are starting points. Adjust them to fit your needs.

### Q: How do I add a new foundation (like "Icons" or "Illustrations")?

**A**:
1. Create a new `.mdx` file in `foundations/`
2. Follow the pattern of existing foundation pages
3. Add it to `docs.json` under the Foundations group

### Q: Should I commit the template files?

**A**: Yes! The `_template.mdx` file is useful to keep in your repo for creating new components.

## Tips for Success

### 1. Start Simple
Don't try to document everything at once. Start with:
- Colors ✅
- Typography ✅
- Buttons ✅
- Inputs ✅

### 2. Be Consistent
Use the same format for all components. The template helps with this.

### 3. Include Images
Documentation with screenshots is 10x more useful than text alone.

### 4. Document the "Why"
Don't just say what the component looks like - explain:
- When to use it
- When NOT to use it
- Best practices

### 5. Keep it Updated
As your Figma designs change, update the docs. Consider this part of your design process.

### 6. Get Feedback
Share the documentation with your team and iterate based on their questions.

## Workflow Recommendation

### Week 1: Foundations
- [ ] Update all foundation pages with actual Figma values
- [ ] Export color palette as image
- [ ] Export typography scale as image
- [ ] Test everything in dev mode

### Week 2: Core Components (Form Elements)
- [ ] Document Text Input
- [ ] Document Select/Dropdown
- [ ] Document Checkbox
- [ ] Document Radio Button
- [ ] Document Toggle/Switch
- [ ] Update Button component (already exists)

### Week 3: Feedback & Display
- [ ] Document Card
- [ ] Document Modal/Dialog
- [ ] Document Alert/Banner
- [ ] Document Toast/Notification
- [ ] Document Tooltip
- [ ] Document Badge/Tag

### Week 4: Polish
- [ ] Add all remaining components
- [ ] Cross-link related components
- [ ] Add more images
- [ ] Review accessibility documentation
- [ ] Test all links

## Commands Reference

```bash
# Start dev server
mint dev

# Check for broken links
mint broken-links

# Update Mintlify CLI
npm update -g mintlify

# Find all component files
ls design-system/components/

# Create new component
cp design-system/components/_template.mdx design-system/components/[name].mdx
```

## Example: Adding a New Component

Here's a complete example of adding a "Text Input" component:

```bash
# 1. In Figma: Export images
# Save to: /images/design-system/components/text-input/
#   - default.png
#   - focus.png
#   - error.png
#   - disabled.png

# 2. Copy template
cp design-system/components/_template.mdx design-system/components/text-input.mdx

# 3. Edit text-input.mdx
# Update frontmatter:
---
title: "Text Input"
description: "Single-line text input field for forms"
icon: "input-text"
---

# Fill in all sections with Figma specs
# Add image references:
![Default state](/images/design-system/components/text-input/default.png)

# 4. Register in docs.json
# Add to Components group:
"design-system/components/text-input"

# 5. Preview
mint dev

# 6. Visit http://localhost:3000/design-system/components/text-input
```

## You're Ready!

Everything is set up. Now it's time to fill in the templates with your Figma designs.

**Start here**: Open `design-system/foundations/colors.mdx` and replace the example values with your actual color palette.

**Questions?** Refer to `FIGMA_DOCUMENTATION_GUIDE.md` for detailed instructions.

**Track progress**: Use `CHECKLIST.md` to mark off completed components.

Good luck! 🎨
