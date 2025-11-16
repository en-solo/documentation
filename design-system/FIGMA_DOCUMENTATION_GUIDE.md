# Guide: Documenting Figma Components

This guide explains how to document your Figma components in this Mintlify documentation site.

## Quick Start

1. **Export screenshots** from Figma for each component variant and state
2. **Copy the component template** from `design-system/components/_template.mdx`
3. **Fill in the specifications** from your Figma design
4. **Add images** to the `/images/` directory
5. **Register the page** in `docs.json`

## Step-by-Step Process

### Step 1: Export from Figma

For each component you want to document:

1. Open your Figma file
2. Select the component or frame
3. Export as PNG at 2x resolution (for retina displays)
4. Name files descriptively: `button-primary.png`, `button-hover.png`, etc.
5. Save to the `/images/design-system/components/` directory

**Recommended exports per component:**
- All variants (primary, secondary, tertiary, etc.)
- All states (default, hover, active, disabled, etc.)
- Size variations (small, medium, large)
- Dark mode versions (if applicable)

### Step 2: Gather Specifications

From Figma's inspection panel, collect these details:

#### Visual Properties
- **Colors**: Exact hex values or design token names
- **Spacing**: Padding values (top, right, bottom, left)
- **Typography**: Font family, size, weight, line height, letter spacing
- **Border radius**: Corner radius values
- **Shadows**: Shadow effects (x, y, blur, spread, color, opacity)
- **Borders**: Width, color, style

#### Dimensions
- Width and height (or auto/flex settings)
- Minimum/maximum sizes
- Gaps between elements (for components with multiple parts)

#### Responsive Behavior
- How the component adapts at different breakpoints
- Mobile vs desktop differences

### Step 3: Create Documentation Page

1. **Copy the template**:
   ```bash
   cp design-system/components/_template.mdx design-system/components/your-component.mdx
   ```

2. **Update the frontmatter**:
   ```mdx
   ---
   title: "Your Component Name"
   description: "Brief description"
   icon: "icon-name"
   ---
   ```

3. **Fill in each section**:

   **Overview**: Explain what the component is and when to use it

   **Variants**: Document each visual variant with:
   - Description of the variant
   - When to use it
   - Screenshot/image
   - Specifications (colors, spacing, etc.)

   **States**: Document all interactive states:
   - Default, Hover, Active, Focus, Disabled, Loading, Error, Success

   **Sizes**: Create a table with specifications for each size

   **Design Specifications**: Fill in the exact values from Figma

   **Usage Guidelines**: Add do's and don'ts

   **Accessibility**: Document keyboard, screen reader, and WCAG compliance

   **Code Example**: Provide HTML/CSS implementation reference

### Step 4: Add Images

1. Place exported images in `/images/design-system/components/[component-name]/`
2. Reference in MDX using:
   ```mdx
   ![Description](/images/design-system/components/button/primary.png)
   ```
   or use Frame component:
   ```mdx
   <Frame>
     <img src="/images/design-system/components/button/primary.png" alt="Primary button" />
   </Frame>
   ```

### Step 5: Register in Navigation

Add your new component page to `docs.json`:

```json
{
  "group": "Components",
  "pages": [
    "design-system/components/buttons",
    "design-system/components/your-new-component"
  ]
}
```

## Component Categories to Document

### Common UI Components
- [ ] Buttons (all variants)
- [ ] Icon Buttons
- [ ] Links
- [ ] Inputs (text, email, password, etc.)
- [ ] Textareas
- [ ] Select/Dropdowns
- [ ] Checkboxes
- [ ] Radio Buttons
- [ ] Toggles/Switches
- [ ] Sliders
- [ ] Date Pickers
- [ ] File Upload

### Navigation Components
- [ ] Navigation Bar
- [ ] Sidebar Navigation
- [ ] Breadcrumbs
- [ ] Tabs
- [ ] Pagination
- [ ] Steps/Stepper

### Feedback Components
- [ ] Alerts
- [ ] Toasts/Notifications
- [ ] Modals/Dialogs
- [ ] Tooltips
- [ ] Popovers
- [ ] Progress Bars
- [ ] Spinners/Loading States
- [ ] Skeletons

### Data Display
- [ ] Cards
- [ ] Tables
- [ ] Lists
- [ ] Badges
- [ ] Tags/Chips
- [ ] Avatars
- [ ] Icons
- [ ] Dividers

### Layout Components
- [ ] Containers
- [ ] Grids
- [ ] Columns
- [ ] Spacers

## Tips for Better Documentation

### Be Specific
❌ "Use this button for important actions"
✅ "Use the primary button for the main action on each page or section (e.g., 'Save', 'Submit', 'Continue'). Limit to one primary button per view."

### Include Context
Always explain:
- **What** the component is
- **When** to use it
- **Why** you'd choose this over alternatives
- **How** it behaves

### Show Examples
- Include visual examples for every variant and state
- Provide real-world use cases
- Show both correct and incorrect usage

### Document Edge Cases
- What happens when content is very long?
- What if there's an icon but no text?
- How does it behave on mobile?
- What about dark mode?

### Maintain Consistency
- Use the same format for all component pages
- Use the same terminology throughout
- Reference design tokens instead of hard-coded values when possible

## Automation Ideas

### Figma API Integration (Future Enhancement)

You could build a script to:
1. Fetch component data from Figma API
2. Export component thumbnails automatically
3. Generate MDX files with basic specifications
4. You'd still review and add usage guidelines manually

### Design Tokens Export

If your Figma file uses variables/tokens:
1. Export tokens as JSON
2. Reference token names in documentation instead of hard-coded values
3. Automatically update docs when tokens change

## Example Workflow

Here's a typical workflow for documenting a component:

```bash
# 1. Create images directory
mkdir -p images/design-system/components/tooltip

# 2. Export from Figma and save to images/design-system/components/tooltip/
# Files: default.png, hover.png, dark-mode.png, etc.

# 3. Copy template
cp design-system/components/_template.mdx design-system/components/tooltip.mdx

# 4. Open tooltip.mdx and fill in all sections
# - Replace placeholder text
# - Add your Figma specifications
# - Add image references
# - Write usage guidelines

# 5. Add to navigation in docs.json
# Add "design-system/components/tooltip" to the Components group

# 6. Test locally
mint dev

# 7. View at http://localhost:3000
```

## Questions?

As you document your components, keep this guide handy. The template file (`_template.mdx`) provides the complete structure you need for each component.

When you're ready to start, pick a simple component like a Button or Input to practice the workflow, then move on to more complex components.
