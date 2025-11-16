# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Mintlify documentation site. Mintlify is a modern documentation platform that uses MDX (Markdown + JSX) for content and a JSON-based configuration system.

## Development Commands

### Local Development
```bash
# Install Mintlify CLI globally
npm i -g mint

# Start local development server (runs on port 3000 by default)
mint dev

# Start on a custom port
mint dev --port 3333

# Update Mintlify CLI to latest version
npm mint update

# Validate all links in documentation
mint broken-links
```

**Prerequisites**: Node.js version 19 or higher

The development server runs at `http://localhost:3000` and hot-reloads on file changes.

## Architecture

### Configuration System (`docs.json`)

The entire site structure is controlled by `docs.json`. This is the single source of truth for:

- **Navigation structure**: Tabs, groups, and page ordering
- **Site metadata**: Name, colors, logo paths
- **UI elements**: Navbar links, footer socials, contextual menu options
- **Theming**: Primary, light, and dark color values

**Important**: All pages must be registered in the `navigation` object to appear in the site. The order in the JSON determines display order.

### Content Structure

All content files use MDX format (`.mdx` extension):

- **Guides**: Root-level files (`index.mdx`, `quickstart.mdx`, `development.mdx`) and content in `essentials/` directory
- **AI Tools**: Documentation for AI coding assistants in `ai-tools/` directory
- **API Reference**: OpenAPI-based API docs in `api-reference/` directory
  - `openapi.json` defines API specifications
  - Individual endpoint examples in `api-reference/endpoint/`
- **Reusable Content**: Snippets stored in `snippets/` directory

### MDX Components

Mintlify provides built-in components that can be used in MDX files:

- `<Card>`, `<CardGroup>`: Card-based layouts
- `<Accordion>`, `<AccordionGroup>`: Collapsible content sections
- `<Steps>`, `<Step>`: Numbered step-by-step guides
- `<Columns>`: Multi-column layouts
- `<Frame>`: Image frames with styling
- `<Tip>`, `<Note>`, `<Info>`, `<Warning>`: Callout boxes
- `<ResponseField>`, `<Expandable>`: API documentation components

## Adding New Pages

1. Create the `.mdx` file in the appropriate directory
2. Add frontmatter with `title` and `description` (required)
3. Register the page path (without extension) in `docs.json` under the appropriate `navigation.tabs[].groups[].pages` array
4. The page will automatically appear in the navigation

Example frontmatter:
```mdx
---
title: "Page Title"
description: "Page description for SEO"
icon: "optional-icon-name"
---
```

## Deployment

Changes are automatically deployed to production when pushed to the default branch (main), provided the Mintlify GitHub app is installed from the dashboard at `https://dashboard.mintlify.com/settings/organization/github-app`.

## File Organization

- **Root `.mdx` files**: Top-level getting started pages
- **`essentials/`**: Core documentation features (markdown, code, images, navigation, settings)
- **`ai-tools/`**: Documentation for Cursor, Claude Code, and Windsurf integrations
- **`api-reference/`**: API documentation and OpenAPI specifications
- **`logo/`**: Logo assets for light/dark modes
- **`images/`**: Image assets referenced in documentation
- **`snippets/`**: Reusable content snippets
- **`docs.json`**: Central configuration file (NEVER delete or severely break this)
- **`favicon.svg`**: Site favicon

## Navigation System

The `docs.json` navigation uses a three-level hierarchy:

1. **Tabs**: Top-level navigation tabs (e.g., "Guides", "API reference")
2. **Groups**: Sections within tabs (e.g., "Getting started", "Customization")
3. **Pages**: Individual pages within groups (referenced by file path without extension)

## Contextual Menu

The site includes a contextual menu (configured in `docs.json`) with options for:
- Copy
- View
- ChatGPT
- Claude
- Perplexity
- MCP
- Cursor
- VSCode

This allows users to interact with documentation content through various AI tools and editors.
