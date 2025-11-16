# Figma Sync Automation

This GitHub Actions workflow automatically syncs Figma screenshots and design specifications to your Mintlify documentation.

## Features

- Automatically detects Figma frames referenced in MDX files
- Exports high-resolution (2x) screenshots when frames are modified
- Extracts and documents design specifications:
  - Spacing (padding, gaps, layout)
  - Colors (background, fills, strokes)
  - Typography (fonts, sizes, weights, line heights)
  - Layout (dimensions, constraints, alignment)
  - Effects (shadows, blurs, border radius, opacity)
- Creates pull requests with all changes
- Smart diffing - only updates when Figma frames are modified
- Manual trigger support with force update option

## Setup

### 1. Get Figma Access Token

1. Go to your [Figma account settings](https://www.figma.com/settings)
2. Scroll to "Personal access tokens"
3. Click "Create a new personal access token"
4. Give it a descriptive name (e.g., "Documentation Sync")
5. Copy the token (you won't be able to see it again!)

### 2. Add Token to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `FIGMA_ACCESS_TOKEN`
5. Value: Paste your Figma token
6. Click **Add secret**

### 3. Enable GitHub Actions

Make sure GitHub Actions are enabled for your repository:

1. Go to **Settings** → **Actions** → **General**
2. Under "Actions permissions", ensure actions are enabled
3. Under "Workflow permissions", select "Read and write permissions"
4. Check "Allow GitHub Actions to create and approve pull requests"

### 4. Install Dependencies

The workflow will automatically install dependencies, but for local testing:

```bash
cd .github/scripts
npm install
```

## Usage

### Adding Figma Frames to Documentation

In your MDX files, add HTML comments with the Figma frame reference:

```mdx
<!-- figma-frame: FILE_ID/NODE_ID -->
```

**How to get FILE_ID and NODE_ID:**

1. Open your Figma file
2. Select the frame you want to sync
3. Right-click → **Copy/Paste as** → **Copy link**
4. The URL will look like: `https://www.figma.com/file/FILE_ID/Title?node-id=NODE_ID`
5. Extract `FILE_ID` and `NODE_ID` from the URL

**Example:**

URL: `https://www.figma.com/file/abc123xyz/MyDesign?node-id=1-2`
- FILE_ID: `abc123xyz`
- NODE_ID: `1-2`

In your MDX:
```mdx
## Button Component

<!-- figma-frame: abc123xyz/1-2 -->
```

### Automatic Sync

The workflow runs automatically:
- **Every Monday at 9:00 AM UTC**
- Scans all MDX files for Figma frame references
- Checks if frames have been modified in Figma
- Updates screenshots and specs only for changed frames
- Creates a PR with all changes

### Manual Sync

To trigger a manual sync:

1. Go to **Actions** tab in your GitHub repository
2. Click **Figma Sync** workflow
3. Click **Run workflow** dropdown
4. Optionally check "Force update all frames" to update all frames regardless of modification status
5. Click **Run workflow**

### What Gets Updated

When a Figma frame is synced, the workflow:

1. **Exports a screenshot** at 2x resolution to `images/figma/`
2. **Extracts specifications** from the Figma frame
3. **Updates the MDX file** with:
   - Frame name as heading
   - Screenshot in a `<Frame>` component
   - Specifications in collapsible accordions

**Example output in MDX:**

```mdx
<!-- figma-frame: abc123xyz/1-2 -->

### Primary Button

<Frame>
  ![Primary Button](images/figma/abc123xyz-1-2-primary-button.png)
</Frame>

<AccordionGroup>
  <Accordion title="Spacing">
    - **Padding**: 12px 24px 12px 24px
    - **Layout**: horizontal
  </Accordion>

  <Accordion title="Colors">
    - **Background**: `#16A34A`
    - **Fills**: `#FFFFFF`
  </Accordion>

  <Accordion title="Typography">
    - **Font Family**: Inter
    - **Font Weight**: 600
    - **Font Size**: 16px
    - **Line Height**: 24px
  </Accordion>

  <Accordion title="Effects">
    - **Border Radius**: 8px
    - **Shadow 1**: `#000000 (10%)` offset(0px, 2px) blur(4px) spread(0px)
  </Accordion>
</AccordionGroup>

<!-- /figma-sync -->
```

## Configuration

### Customize Schedule

Edit [.github/workflows/figma-sync.yml](../workflows/figma-sync.yml):

```yaml
on:
  schedule:
    # Runs every Monday at 9:00 AM UTC
    - cron: '0 9 * * 1'
```

Change the cron expression to your preferred schedule:
- `0 9 * * 1` - Every Monday at 9 AM UTC
- `0 0 * * *` - Every day at midnight UTC
- `0 */6 * * *` - Every 6 hours
- `0 9 * * 1,3,5` - Monday, Wednesday, Friday at 9 AM UTC

[Learn more about cron syntax](https://crontab.guru/)

### Customize Export Settings

Edit [.github/scripts/sync-figma.js](sync-figma.js), in the `exportScreenshot` method:

```javascript
const imageBuffer = await this.figmaClient.exportImage(fileId, nodeId, {
  format: 'png',  // Options: 'png', 'jpg', 'svg', 'pdf'
  scale: 2        // Options: 1, 2, 3, 4
});
```

### Customize Image Directory

Edit [.github/scripts/sync-figma.js](sync-figma.js):

```javascript
const IMAGES_DIR = path.join(DOCS_DIR, 'images/figma');
```

Change to your preferred location.

## File Structure

```
.github/
├── workflows/
│   └── figma-sync.yml          # GitHub Actions workflow
└── scripts/
    ├── sync-figma.js           # Main sync script
    ├── figma-client.js         # Figma API client
    ├── metadata-tracker.js     # Tracks frame modifications
    ├── mdx-updater.js          # Updates MDX files
    ├── package.json            # Node.js dependencies
    └── README.md               # This file

images/
└── figma/                      # Auto-generated screenshots
```

## Troubleshooting

### Workflow fails with "FIGMA_ACCESS_TOKEN is required"

Make sure you've added the Figma token to GitHub Secrets (see Setup step 2).

### No pull request is created

This is expected if no Figma frames have been modified since the last sync. The workflow exits silently when there are no changes.

### Frame not found error

- Verify the FILE_ID and NODE_ID are correct
- Make sure your Figma token has access to the file
- Check that the frame hasn't been deleted in Figma

### Images not appearing in documentation

- Verify the image path is correct relative to the MDX file
- Check that the `images/figma/` directory exists
- Ensure the Mintlify config allows images from this directory

### Force update all frames

Use the manual trigger with "Force update all frames" checked to regenerate all screenshots and specs regardless of modification status.

## Local Testing

To test the sync locally:

```bash
# Set your Figma token
export FIGMA_ACCESS_TOKEN="your-token-here"

# Run the sync
cd .github/scripts
node sync-figma.js
```

## API Rate Limits

The Figma API has rate limits:
- Personal tokens: 1,000 requests per minute

If you have many frames, consider:
- Reducing sync frequency
- Splitting frames across multiple files
- Using force update sparingly

## Contributing

To extend functionality:

1. **Add new specification extractors** in `figma-client.js`
2. **Customize MDX formatting** in `mdx-updater.js`
3. **Modify workflow triggers** in `figma-sync.yml`

## License

MIT
