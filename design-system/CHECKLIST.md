# Design System Documentation Checklist

Use this checklist to track your progress documenting components from Figma.

## Phase 1: Foundations Setup ✅

- [x] Create design system directory structure
- [x] Set up overview/landing page
- [x] Create color system template
- [x] Create typography template
- [x] Create spacing template
- [x] Create shadows template
- [x] Create design tokens template
- [x] Add Design System tab to navigation

## Phase 2: Fill in Foundations (Do This First!)

Update the existing foundation pages with your actual Figma values:

- [ ] **Colors** (`foundations/colors.mdx`)
  - [ ] Replace example hex values with your actual colors
  - [ ] Add primary brand colors
  - [ ] Add secondary colors
  - [ ] Add semantic colors (success, error, warning, info)
  - [ ] Add neutral/gray scale
  - [ ] Verify contrast ratios meet WCAG AA
  - [ ] Document dark mode colors
  - [ ] Export color swatches from Figma as images

- [ ] **Typography** (`foundations/typography.mdx`)
  - [ ] Add your actual font families
  - [ ] Update type scale with your sizes
  - [ ] Document all font weights you use
  - [ ] Add line height values
  - [ ] Add letter spacing values
  - [ ] Document responsive typography rules
  - [ ] Export typography samples from Figma

- [ ] **Spacing** (`foundations/spacing.mdx`)
  - [ ] Verify spacing scale matches your Figma
  - [ ] Update component padding values
  - [ ] Document your grid system
  - [ ] Add container widths
  - [ ] Document responsive spacing
  - [ ] Add margin conventions

- [ ] **Shadows** (`foundations/shadows.mdx`)
  - [ ] Copy shadow values from Figma
  - [ ] Document elevation levels
  - [ ] Add colored shadow variants
  - [ ] Document z-index scale
  - [ ] Add dark mode shadow adjustments

- [ ] **Design Tokens** (`foundations/design-tokens.mdx`)
  - [ ] Fill in all color tokens
  - [ ] Fill in spacing tokens
  - [ ] Fill in typography tokens
  - [ ] Fill in shadow tokens
  - [ ] Add any custom tokens
  - [ ] Export tokens from Figma (if using variables)

## Phase 3: Core Components

Document these essential components first:

### Form Components
- [ ] **Text Input**
  - [ ] Export all states from Figma
  - [ ] Create documentation page
  - [ ] Document variants (default, error, success, disabled)
  - [ ] Add to navigation

- [ ] **Textarea**
  - [ ] Export states
  - [ ] Create page
  - [ ] Add to navigation

- [ ] **Select/Dropdown**
  - [ ] Export states and open state
  - [ ] Create page
  - [ ] Add to navigation

- [ ] **Checkbox**
  - [ ] Export checked/unchecked/indeterminate states
  - [ ] Create page
  - [ ] Add to navigation

- [ ] **Radio Button**
  - [ ] Export selected/unselected states
  - [ ] Create page
  - [ ] Add to navigation

- [ ] **Toggle/Switch**
  - [ ] Export on/off states
  - [ ] Create page
  - [ ] Add to navigation

### Action Components
- [x] **Button** (Example already created)
  - [ ] Update with your actual Figma specs
  - [ ] Replace example screenshots

- [ ] **Icon Button**
  - [ ] Export all variants
  - [ ] Create page
  - [ ] Add to navigation

- [ ] **Link**
  - [ ] Export states
  - [ ] Create page
  - [ ] Add to navigation

### Feedback Components
- [ ] **Alert/Banner**
  - [ ] Export variants (info, success, warning, error)
  - [ ] Create page
  - [ ] Add to navigation

- [ ] **Toast/Notification**
  - [ ] Export all types
  - [ ] Create page
  - [ ] Add to navigation

- [ ] **Modal/Dialog**
  - [ ] Export with overlay
  - [ ] Document sizes
  - [ ] Create page
  - [ ] Add to navigation

- [ ] **Tooltip**
  - [ ] Export with pointer
  - [ ] Create page
  - [ ] Add to navigation

### Data Display
- [ ] **Card**
  - [ ] Export all variants
  - [ ] Create page
  - [ ] Add to navigation

- [ ] **Badge**
  - [ ] Export all colors/variants
  - [ ] Create page
  - [ ] Add to navigation

- [ ] **Tag/Chip**
  - [ ] Export variants
  - [ ] Create page
  - [ ] Add to navigation

- [ ] **Avatar**
  - [ ] Export sizes
  - [ ] Create page
  - [ ] Add to navigation

- [ ] **Table**
  - [ ] Export table styles
  - [ ] Document row states
  - [ ] Create page
  - [ ] Add to navigation

## Phase 4: Navigation Components

- [ ] **Navigation Bar**
  - [ ] Export desktop and mobile versions
  - [ ] Create page
  - [ ] Add to navigation

- [ ] **Sidebar Navigation**
  - [ ] Export expanded/collapsed states
  - [ ] Create page
  - [ ] Add to navigation

- [ ] **Breadcrumbs**
  - [ ] Export examples
  - [ ] Create page
  - [ ] Add to navigation

- [ ] **Tabs**
  - [ ] Export active/inactive states
  - [ ] Create page
  - [ ] Add to navigation

- [ ] **Pagination**
  - [ ] Export all states
  - [ ] Create page
  - [ ] Add to navigation

## Phase 5: Complex Components

- [ ] **Dropdown Menu**
  - [ ] Export open/closed states
  - [ ] Create page
  - [ ] Add to navigation

- [ ] **Date Picker**
  - [ ] Export calendar view
  - [ ] Create page
  - [ ] Add to navigation

- [ ] **File Upload**
  - [ ] Export drag states
  - [ ] Create page
  - [ ] Add to navigation

- [ ] **Progress Bar**
  - [ ] Export variants
  - [ ] Create page
  - [ ] Add to navigation

- [ ] **Slider**
  - [ ] Export states
  - [ ] Create page
  - [ ] Add to navigation

- [ ] **Stepper**
  - [ ] Export all steps
  - [ ] Create page
  - [ ] Add to navigation

## Phase 6: Patterns & Guidelines

- [x] **Layout Patterns** (Template created)
  - [ ] Add screenshots from your actual designs
  - [ ] Document your specific patterns

- [ ] **Form Patterns**
  - [ ] Document form layouts
  - [ ] Add examples
  - [ ] Create page
  - [ ] Add to navigation

- [ ] **Navigation Patterns**
  - [ ] Document nav patterns
  - [ ] Add examples
  - [ ] Create page
  - [ ] Add to navigation

- [ ] **Data Patterns**
  - [ ] Document table patterns
  - [ ] Document chart patterns
  - [ ] Create page
  - [ ] Add to navigation

## Phase 7: Polish & Maintenance

- [ ] **Images**
  - [ ] Create organized image directory structure
  - [ ] Export all component screenshots from Figma
  - [ ] Optimize images for web (compress)
  - [ ] Add images to all documented components

- [ ] **Cross-linking**
  - [ ] Add "Related Components" links
  - [ ] Link from patterns to components
  - [ ] Link from components to foundations

- [ ] **Code Examples**
  - [ ] Review all code examples for accuracy
  - [ ] Add framework-specific examples if needed
  - [ ] Test code snippets

- [ ] **Accessibility**
  - [ ] Verify all components have accessibility docs
  - [ ] Check WCAG compliance notes
  - [ ] Add keyboard shortcuts documentation

- [ ] **Testing**
  - [ ] Run `mint dev` and test all links
  - [ ] Check all images load correctly
  - [ ] Verify navigation works
  - [ ] Test on mobile viewport
  - [ ] Run `mint broken-links` to check for broken links

## Quick Reference

### For Each Component:

1. ✅ Export images from Figma
2. ✅ Copy template: `cp design-system/components/_template.mdx design-system/components/[name].mdx`
3. ✅ Fill in all sections
4. ✅ Add images to `/images/design-system/components/[name]/`
5. ✅ Register in `docs.json`
6. ✅ Preview with `mint dev`
7. ✅ Check this box when complete!

### Priority Order:

1. **First**: Update foundation pages with actual values
2. **Second**: Document form components (inputs, selects, checkboxes, etc.)
3. **Third**: Document action components (buttons, links)
4. **Fourth**: Document feedback components (alerts, modals, tooltips)
5. **Last**: Document complex components and patterns

## Notes

- Keep this checklist updated as you work
- Add any custom components specific to your design system
- Mark items as complete as you finish them
- Commit progress regularly to version control

---

**Last Updated**: [Add date when you update this file]
**Progress**: 0/[total components] components documented
