### Project: NSFW Content Blocker with Persistent Protection & Life Improvement Focus

- Build a legitimate content filtering system that combines browser extension and desktop application to block NSFW content with multiple layers of protection against impulsive disabling, emphasizing personal growth and self-improvement.

# Core Requirements:

## 1. Browser Extension (Chrome/Firefox - Manifest V3)

# Multi-Layer Content Detection:

- Domain blacklist blocking (known NSFW sites)

- Keyword/phrase detection - Scan page titles, URLs, meta tags, and visible text for NSFW terms

- Image analysis - Use NSFW.js or similar ML model to scan images in real-time

- Google Safe Browsing API for additional URL verification

- Block pages if any detection method triggers (domain OR keywords OR images)

- Password protection (hashed) required to disable extension

- Cannot be uninstalled without desktop app authorization

- Communicate with desktop app via native messaging

- Visual feedback when content is blocked (motivational message)

## 2. Desktop Application (Python or Electron for Windows)

- Run as Windows background service (auto-start on boot)

- Monitor browser extension status continuously

- Re-enable extension if user tries to disable it

- Backup blocking via Windows hosts file modification

- Manage uninstall/disable requests with friction system

- Require admin privileges for installation

- System tray icon with minimal UI

- Motivational dashboard showing progress and stats

## 3. Enhanced Friction & Security Layers

- Password set during initial installation (bcrypt hashed)

- 48-hour waiting period after uninstall request is made

- During waiting period:

- Display countdown timer

- Show motivational quotes and statistics (days clean, sites blocked)

- Allow user to cancel uninstall request at any time

- Even during the uninstall request waiting period IT SHOULD NOT STOP BLOCKING.

## After 48 hours expires:

- Re-confirmation dialog with reflection prompts:

- "Are you sure you want to uninstall?"

- "How has this tool helped you in the past 48 hours?"

- "What positive changes have you noticed?"

- "Do you want to improve your life or go back?"

- Require typing a random 20-character code to confirm

- Option to extend protection instead of uninstalling (reset waiting period)

- Optional: Email notification to trusted contact when uninstall requested

- All bypass attempts logged locally with timestamps

## 4. Content Detection Methods (Priority Order)

## A. Domain Blocking:

- Curated blocklist of known NSFW domains (updateable)

- Wildcard support for subdomains

- Regular expression patterns for dynamic URLs

## B. Keyword/Text Detection:

- Comprehensive NSFW keyword list (nouns, verbs, phrases)

- Scan page title, URL, meta description, headings, and body text

- Context-aware detection (avoid false positives)

- Multiple language support

- Configurable sensitivity levels

## C. Image Analysis:

- Integrate NSFW.js (or similar TensorFlow.js model)

- Scan all images on page load

- Real-time detection as images appear (lazy loading)

- Confidence threshold (e.g., block if >60% confidence)

- Blur suspicious images before analysis completes

- Performance optimization (don't scan tiny images)

- D. API Verification:

- Google Safe Browsing API as final check

- Cache results to minimize API calls

## 5. User Experience & Motivation

## Installation:

- Clean wizard with clear consent and explanation

- Set password and optional trusted contact

- Choose blocking sensitivity (strict/moderate/custom)

- Set personal goals and reasons for using the tool

- Blocking Screen:

- Show motivational message instead of blocked content

- Display user's personal goal/reason

- Show statistics (days clean, total blocks)

- Inspirational quote

- Quick access to whitelist if false positive

## Dashboard:

- Days since installation

- Total sites/images/keywords blocked

- Streak counter

- Progress graphs

- Personal notes/journal feature

- Goal tracking

## 6. Technical Stack

-Extension: JavaScript (Manifest V3), TensorFlow.js for image detection

- Desktop App: Python with PyInstaller OR Electron

- Storage: Encrypted local config files (AES-256)

- APIs: Google Safe Browsing API (free tier)

- Service: Windows Task Scheduler or proper Windows service

- ML Model: NSFW.js or GantMan's NSFW detection model

## 7. Legitimate Safeguards

- Full transparency during installation about what it does

- Clear uninstall process (with friction, but always possible)

- No hidden files or deceptive practices

- Respects user consent and privacy

- All blocking is local (no browsing data sent externally except Safe Browsing API hashes)

- Emergency override option (requires admin password + 24-hour waiting period)

- Data stays on user's machine

## 8. Configuration & Customization

- Whitelist for false positives (requires password)

- Adjustable sensitivity for keyword/image detection

- Custom keyword additions

- Schedule-based blocking (e.g., stricter at night)

- Import/export settings

## Deliverables:

## Browser extension with multi-layer detection (domains + keywords + images)

## Desktop companion app with service management and motivational features

- Installation wizard with goal-setting

- Comprehensive blocklists (domains + keywords) in JSON format

- README with setup instructions and philosophy

- Uninstall flow with 48-hour waiting period and re-confirmation dialog

- Development Priority:

- Domain + keyword blocking (immediate value)

- Friction system with 48-hour waiting period and re-confirmation

- Desktop app monitoring and service

- Image detection with NSFW.js

- Motivational dashboard and statistics

- Build this as a tool that genuinely helps people improve their lives, not just a blocker. Focus on encouragement and positive reinforcement throughout the user experience.