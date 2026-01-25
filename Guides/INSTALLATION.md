# Installation Guide - Pure Path

## Quick Start

### Chrome/Edge Installation

1. **Download the Extension**
   - Download or clone this repository to your computer
   - Extract if downloaded as ZIP

2. **Open Extensions Page**
   - Open Chrome/Edge
   - Navigate to `chrome://extensions/`
   - Or click the puzzle icon → "Manage Extensions"

3. **Enable Developer Mode**
   - Toggle "Developer mode" switch in the top right corner

4. **Load the Extension**
   - Click "Load unpacked" button
   - Navigate to the extension folder
   - Select the folder and click "Select Folder"

5. **Complete Setup**
   - The setup wizard will open automatically
   - Set a strong password (you'll need this to change settings)
   - Optionally add your personal goal
   - Check the consent box
   - Click "Complete Setup"

6. **Pin the Extension (Optional)**
   - Click the puzzle icon in Chrome toolbar
   - Find "Pure Path - Content Filter"
   - Click the pin icon to keep it visible

### Firefox Installation

1. **Download the Extension**
   - Download or clone this repository
   - Extract if downloaded as ZIP

2. **Open Debugging Page**
   - Open Firefox
   - Navigate to `about:debugging#/runtime/this-firefox`

3. **Load Temporary Add-on**
   - Click "Load Temporary Add-on..."
   - Navigate to the extension folder
   - Select the `manifest.json` file
   - Click "Open"

4. **Complete Setup**
   - The setup wizard will open automatically
   - Follow the same setup steps as Chrome

**Note**: In Firefox, temporary add-ons are removed when you close the browser. For permanent installation, you would need to sign the extension through Mozilla.

## Post-Installation

### Verify Installation
1. Click the extension icon in your browser toolbar
2. You should see your statistics dashboard
3. Try visiting a blocked site to test (e.g., one from the blocklist)

### First-Time Configuration

#### Setting Your Password
- Choose a password that's strong but not easily remembered in moments of impulse
- This password will be required to:
  - Change extension settings
  - Modify blocklists
  - Change the password itself

#### Setting Your Goal (Optional)
- Write why you're using Pure Path
- This will be displayed when content is blocked
- Examples:
  - "I want to focus on my career and relationships"
  - "I'm working on becoming the best version of myself"
  - "I want to use my time more productively"

## Testing the Extension

### Test Domain Blocking
Try visiting any of these test domains (they're in the blocklist):
- `pornhub.com`
- `xvideos.com`

You should see the Pure Path blocked page with motivational content.

### Test Keyword Blocking
Try searching for blocked keywords in your browser. Pages with these keywords in the title or URL will be blocked.

## Customizing Blocklists

### Adding Domains
1. Open `blocklists/domains.json`
2. Add domains to the array:
```json
{
  "domains": [
    "example.com",
    "another-site.com"
  ]
}
```
3. Reload the extension

### Adding Keywords
1. Open `blocklists/keywords.json`
2. Add keywords to the array:
```json
{
  "keywords": [
    "keyword1",
    "keyword2"
  ]
}
```
3. Reload the extension

### Reloading the Extension
After making changes:
- Chrome/Edge: Go to `chrome://extensions/` and click the refresh icon
- Firefox: Go to `about:debugging` and click "Reload"

## Troubleshooting

### Extension Not Working
1. Check that the extension is enabled in `chrome://extensions/`
2. Verify the extension icon appears in your toolbar
3. Check browser console for errors (F12 → Console tab)

### Blocklists Not Loading
1. Verify JSON files are properly formatted
2. Check that files are in the `blocklists/` folder
3. Reload the extension

### Forgot Password
Currently, if you forget your password, you'll need to:
1. Remove the extension
2. Reinstall it
3. Set a new password

**Important**: Write down your password in a secure location!

### Extension Not Blocking Sites
1. Verify the domain is in `blocklists/domains.json`
2. Check that keywords are in `blocklists/keywords.json`
3. Reload the extension after making changes
4. Clear browser cache and try again

## Icons

The extension currently uses placeholder icons. To add custom icons:

1. Create three PNG images:
   - `icons/icon16.png` (16x16 pixels)
   - `icons/icon48.png` (48x48 pixels)
   - `icons/icon128.png` (128x128 pixels)

2. Use a shield or lock symbol to represent protection

3. Reload the extension

## Uninstalling

To uninstall Pure Path:

1. Go to `chrome://extensions/` (or `about:addons` in Firefox)
2. Find "Pure Path - Content Filter"
3. Click "Remove"
4. Confirm removal

**Note**: Phase 2 will add a 48-hour waiting period for uninstallation. Phase 1 can be removed immediately.

## Getting Help

If you encounter issues:
1. Check this installation guide
2. Review the README.md file
3. Check browser console for error messages
4. Verify all files are present and properly formatted

## Next Steps

After installation:
1. Test the blocking functionality
2. Customize blocklists for your needs
3. Set your personal goal in the popup
4. Check your statistics regularly for motivation

---

**Remember**: This tool is here to help you, not restrict you. Use it as part of your journey toward personal growth! 🛡️
