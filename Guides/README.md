# Pure Path - Content Filter Extension

## Phase 1 MVP: Browser Extension with Domain + Keyword Blocking + Password Protection

Pure Path is a content filtering system designed to help you stay focused on personal growth by blocking NSFW content with multiple layers of protection.

## Features (Phase 1)

### Multi-Layer Content Detection
- **Domain Blocking**: Blocks known NSFW websites from a curated blocklist
- **Keyword Detection**: Scans page titles, URLs, meta tags, and content for NSFW keywords
- **Real-time Protection**: Checks content as pages load

### Password Protection
- Set a password during initial setup
- Password required to change settings
- SHA-256 hashed password storage
- Cannot disable extension without password

### Motivational Features
- Beautiful blocked page with motivational quotes
- Progress tracking (days protected, sites blocked)
- Personal goal setting
- Encouraging messages

## Installation

### For Chrome/Edge

1. Download or clone this repository
2. Open Chrome/Edge and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the extension folder
6. Complete the setup wizard

### For Firefox

1. Download or clone this repository
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file
5. Complete the setup wizard

## Setup

1. On first install, you'll be guided through a setup wizard
2. Set a strong password (minimum 6 characters)
3. Optionally set your personal goal
4. Give consent to enable protection
5. Click "Complete Setup"

## Usage

### Viewing Statistics
- Click the extension icon to see your stats
- View total sites blocked and days protected

### Changing Password
1. Click the extension icon
2. Click "Change Password"
3. Enter current password
4. Enter and confirm new password
5. Click "Save Password"

### Viewing Blocklists
- Click "View Blocklists" in the popup to see all blocked domains and keywords

## Blocklists

### Domains (`blocklists/domains.json`)
Contains a curated list of known NSFW domains. The extension blocks:
- Exact domain matches
- All subdomains of blocked domains

### Keywords (`blocklists/keywords.json`)
Contains NSFW keywords that trigger blocking when found in:
- Page URLs
- Page titles
- Meta descriptions
- Page headings (h1, h2, h3)

## Customization

You can customize the blocklists by editing the JSON files:

### Adding Domains
Edit `blocklists/domains.json`:
```json
{
  "domains": [
    "example.com",
    "another-site.com"
  ]
}
```

### Adding Keywords
Edit `blocklists/keywords.json`:
```json
{
  "keywords": [
    "keyword1",
    "keyword2"
  ]
}
```

After editing, reload the extension for changes to take effect.

## Technical Details

### Architecture
- **Manifest V3**: Modern Chrome extension format
- **Service Worker**: Background script for monitoring
- **Content Scripts**: Injected into pages for content analysis
- **Local Storage**: Encrypted password and stats storage

### Security
- Passwords are hashed using SHA-256
- No browsing data sent externally
- All processing happens locally

### Files Structure
```
pure-path/
├── manifest.json           # Extension configuration
├── background.js           # Service worker (monitoring)
├── content.js             # Content script (page analysis)
├── popup.html/js          # Extension popup UI
├── setup.html/js          # Initial setup wizard
├── blocked.html/js        # Blocked page UI
├── blocklists.html/js     # Blocklist viewer
├── blocklists/
│   ├── domains.json       # Blocked domains list
│   └── keywords.json      # Blocked keywords list
├── icons/                 # Extension icons
└── README.md             # This file
```

## Future Phases

### Phase 2 (Planned)
- Desktop companion application
- Windows service monitoring
- 48-hour uninstall waiting period
- Enhanced friction system

### Phase 3 (Planned)
- Image analysis with NSFW.js
- Google Safe Browsing API integration
- Advanced motivational dashboard
- Progress graphs and journaling

## Philosophy

Pure Path is built on the principle that lasting change comes from:
1. **Protection**: Multiple layers prevent impulsive decisions
2. **Motivation**: Positive reinforcement and progress tracking
3. **Friction**: Time delays allow rational thinking to override impulses
4. **Transparency**: Clear about what it does and how to remove it

This tool is designed to help you become the person you want to be, not to trap you. The friction systems give you time to think, but you always have control.

## Privacy

- All data stays on your device
- No analytics or tracking
- No external data transmission
- Open source and auditable

## Support

If you encounter issues:
1. Check that the extension is enabled
2. Verify blocklists are properly formatted JSON
3. Try reloading the extension
4. Check browser console for errors

## License

This project is provided as-is for personal use. Feel free to modify and customize for your needs.

## Disclaimer

This extension is a tool to assist with self-control and personal growth. It is not foolproof (At least for now.) and should be used as part of a broader strategy for personal improvement. If you're struggling with compulsive behaviors, consider seeking professional help.

---

**Remember**: Every time you see the blocked page, you're making progress. You're choosing growth over impulse. Keep going...
