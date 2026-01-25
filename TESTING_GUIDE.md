# 🧪 Pure Path - Testing Guide

## Quick Start Testing

### 1. Open Test Suite
```
Open test-blocklists.html in your browser
```

### 2. Run Automated Tests
Click the **"🚀 Run All Tests"** button to run all automated tests.

### 3. View Results
- ✅ Green = Test passed
- ❌ Red = Test failed
- ℹ️ Blue = Informational

### 4. Check Console
All debug logs appear in the console panel at the bottom.

---

## Manual Testing Checklist

### Search Functionality
- [ ] Search for "pornhub.com" - should find exact match
- [ ] Search for "porn" - should find multiple matches
- [ ] Search for "google.com" - should show not found
- [ ] Search for "sex" - should find multiple keywords
- [ ] Check that matches are highlighted in yellow
- [ ] Verify match count is displayed

### Modal Functionality
- [ ] Click "+ Add Domain" button
- [ ] Modal opens smoothly
- [ ] Click X button - modal closes
- [ ] Open modal again
- [ ] Click Cancel button - modal closes
- [ ] Open modal again
- [ ] Press Escape key - modal closes
- [ ] Open modal again
- [ ] Click outside modal (overlay) - modal closes
- [ ] Repeat for "+ Add Keyword" button

### Add Functionality
- [ ] Search for non-existent domain
- [ ] Click "+ Add to blocklist" button
- [ ] Modal opens with domain pre-filled
- [ ] Click "Add Domain"
- [ ] Success message appears
- [ ] Modal auto-closes after 1.5 seconds
- [ ] Search for the domain again - should now be found

### Error Handling
- [ ] Try to add empty domain - should show error
- [ ] Try to add invalid domain (no dot) - should show error
- [ ] Try to add duplicate domain - should show error
- [ ] Verify error messages are clear and helpful

---

## Debug Console Logs

### What to Look For

**Good Logs:**
```
[10:30:45] [INIT] 🚀 Blocklist Manager initializing...
[10:30:45] [LOAD] ✅ Loaded 1133 domains and 1244 keywords
[10:30:45] [UI] ✅ UI updated with counts
```

**Error Logs:**
```
[10:30:45] [ERROR] ❌ Failed to load blocklists: [error]
```

### Enable Debug Mode

Debug mode is enabled by default. To disable:
```javascript
// In blocklists.js
const DEBUG = false;
```

---

## Common Issues & Solutions

### Issue: "No matches found" for known NSFW terms
**Cause**: Blocklists not loaded
**Solution**: Check console for loading errors, reload extension

### Issue: Modal won't close
**Cause**: Event handlers not attached
**Solution**: Reload page, check console for errors

### Issue: Search is slow
**Cause**: Large dataset
**Solution**: Should be < 10ms even for 1000+ items, check console

### Issue: Duplicate items added
**Cause**: Validation not working
**Solution**: Check console logs for validation errors

---

## Performance Benchmarks

### Expected Performance
- Search: < 10ms for 1000+ items
- Modal open/close: < 200ms animation
- Add operation: < 500ms total
- UI update: < 50ms

### How to Measure
1. Open browser DevTools
2. Go to Performance tab
3. Record while performing actions
4. Check timing in timeline

---

## Test Coverage

### Automated Tests ✅
- Domain exact match
- Domain partial match
- Domain not found
- Keyword exact match
- Keyword partial match
- Keyword not found
- Data integrity
- Type validation

### Manual Tests ✅
- Modal open/close (all methods)
- Add domain/keyword
- Error handling
- Visual feedback
- Keyboard shortcuts

---

## Reporting Issues

### Information to Include
1. Browser and version
2. Console error messages
3. Steps to reproduce
4. Expected vs actual behavior
5. Screenshots if applicable

### Where to Report
- Check console logs first
- Review SEARCH_IMPROVEMENTS.md
- Check BLOCKLIST_UI_FIX.md
- Document issue with details above

---

## Quick Debug Commands

### Check Blocklist Counts
```javascript
chrome.runtime.sendMessage({ action: 'getBlocklists' }, (r) => {
  console.log('Domains:', r.domains.length);
  console.log('Keywords:', r.keywords.length);
});
```

### Check Stats
```javascript
chrome.runtime.sendMessage({ action: 'getStats' }, (r) => {
  console.log('Stats:', r.stats);
});
```

### Test Search
```javascript
// In blocklists.html console
const matches = domains.filter(d => d.includes('porn'));
console.log('Matches:', matches.length);
```

---

## Success Criteria

### All Tests Pass ✅
- No console errors
- All automated tests green
- All manual tests completed
- Performance within benchmarks

### User Experience ✅
- Search is fast and accurate
- Modals open/close smoothly
- Error messages are helpful
- Visual feedback is clear

### Code Quality ✅
- Debug logs are comprehensive
- Error handling is robust
- Code is well-documented
- No memory leaks

---

**Happy Testing! 🎉**

If all tests pass, your Pure Path extension is working perfectly!
