# 🔧 Troubleshooting Guide - Pure Path

## Extension Not Blocking Sites

### Most Common Issue: Setup Not Completed ⚠️

**The extension REQUIRES setup before it will block anything!**

#### How to Complete Setup:
1. Click the Pure Path extension icon in your browser toolbar
2. The setup wizard should open automatically
3. Set a password (minimum 6 characters)
4. Optionally add your personal goal
5. Check the "I understand" consent box
6. Click "Complete Setup"

**Until you complete setup, the extension will NOT block any sites!**

---

## Checking If Setup Is Complete

### Method 1: Check Console
1. Open Chrome DevTools (Press F12)
2. Go to the "Console" tab
3. Look for these messages:
   - ✅ `Pure Path installed`
   - ✅ `Loaded 608 domains and 1417 keywords`
   - ⚠️ If you see: `Setup not completed` - you need to complete setup!

### Method 2: Try to Open Popup
1. Click the extension icon
2. If you see the setup wizard → Complete it
3. If you see the stats dashboard → Setup is complete

---

## Testing Blocking

### Important: Search Results vs Actual Sites

**The extension does NOT block search results!**

❌ **Won't Block:** Searching for "xxx" on Google
✅ **Will Block:** Actually visiting `xxx.com`

### How to Test Properly:

1. **Complete setup first** (see above)
2. **Type a blocked domain directly** in the address bar:
   - `xnxx.com`
   - `pornhub.com`
   - `xxx.com`
3. Press Enter
4. You should be redirected to the Pure Path blocked page

### What You Should See:
- Beautiful blocked page with shield icon
- Motivational quote
- Your stats (sites blocked, days protected)
- "Go Back" button

---

## Debugging Steps

### Step 1: Check Extension Is Installed
1. Go to `chrome://extensions/`
2. Find "Pure Path - Content Filter"
3. Make sure it's **enabled** (toggle should be blue/on)

### Step 2: Check Console Logs
1. Visit any website
2. Open DevTools (F12)
3. Go to Console tab
4. Look for Pure Path messages:
   - `🔍 Pure Path: Checking URL: ...`
   - `🚫 Pure Path: BLOCKED!` (if blocked)
   - `✅ Pure Path: URL allowed` (if not blocked)
   - `⚠️ Pure Path: Setup not completed` (if setup needed)

### Step 3: Check Blocklists Loaded
1. Open DevTools Console
2. Type: `chrome.runtime.sendMessage({action: 'getBlocklists'}, console.log)`
3. You should see 608 domains and 1417 keywords

### Step 4: Reload Extension
1. Go to `chrome://extensions/`
2. Find Pure Path
3. Click the refresh/reload icon
4. Try blocking again

---

## Common Issues & Solutions

### Issue 1: "Setup not completed" in console
**Solution:** Complete the setup wizard (see top of this guide)

### Issue 2: Extension icon doesn't open anything
**Solution:** 
1. Reload the extension
2. Check for errors in `chrome://extensions/`
3. Make sure all files are present

### Issue 3: Blocklists show 0 domains/keywords
**Solution:**
1. Check JSON files are valid
2. Reload extension
3. Check console for errors

### Issue 4: Sites not blocking even after setup
**Solution:**
1. Make sure you're visiting the actual site, not search results
2. Check console logs to see what's happening
3. Verify the domain is in the blocklist
4. Try reloading the extension

### Issue 5: Search results showing NSFW content
**Solution:** The extension blocks **websites**, not search results. Use SafeSearch in your browser settings to filter search results.

---

## Verification Checklist

Before reporting an issue, verify:

- [ ] Extension is installed and enabled
- [ ] Setup wizard has been completed
- [ ] Password has been set
- [ ] Console shows "Loaded 608 domains and 1417 keywords"
- [ ] You're visiting actual sites, not just searching
- [ ] You're typing the URL directly in the address bar
- [ ] Extension has been reloaded after any changes

---

## Expected Behavior

### What Gets Blocked:
✅ Visiting `pornhub.com` directly
✅ Visiting `xnxx.com` directly
✅ Visiting any URL with blocked keywords (e.g., `example.com/xxx`)
✅ Pages with blocked keywords in title/content

### What Doesn't Get Blocked:
❌ Google search results for "xxx"
❌ Bing search results for blocked terms
❌ Images in search results (use SafeSearch)
❌ Chrome internal pages (`chrome://`)
❌ Extension pages

---

## Getting Help

If blocking still doesn't work after following this guide:

1. **Check Console Logs:**
   - Open DevTools (F12)
   - Go to Console tab
   - Copy all Pure Path messages
   
2. **Check Extension Errors:**
   - Go to `chrome://extensions/`
   - Click "Errors" button on Pure Path
   - Copy any error messages

3. **Verify Setup:**
   - Click extension icon
   - Take screenshot of what you see
   
4. **Test URL:**
   - Try visiting `xnxx.com` directly
   - Take screenshot of what happens
   - Check console for messages

---

## Quick Test

Run this quick test to verify everything works:

1. ✅ Complete setup (set password)
2. ✅ Open DevTools Console (F12)
3. ✅ Type in address bar: `xnxx.com`
4. ✅ Press Enter
5. ✅ You should see:
   - Console: `🔍 Pure Path: Checking URL: https://xnxx.com/`
   - Console: `🚫 Pure Path: BLOCKED! domain xnxx.com`
   - Browser: Redirected to Pure Path blocked page

If all 5 steps work, the extension is working correctly! 🎉

---

## Still Not Working?

Make sure you:
1. **Completed setup** - This is the #1 reason blocking doesn't work
2. **Reloaded the extension** after installing
3. **Are visiting actual sites** not just searching
4. **Have icons generated** (use create-icons.html)
5. **Are using a supported browser** (Chrome, Edge, or Firefox)

---

*Last updated: January 24, 2026*
