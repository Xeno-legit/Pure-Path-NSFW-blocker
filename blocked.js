// Blocked page script
const quotes = [
  "The only person you are destined to become is the person you decide to be. - Ralph Waldo Emerson",
  "Success is the sum of small efforts repeated day in and day out. - Robert Collier",
  "You are not your urges. You are the one who decides. - Anonymous",
  "Every moment is a fresh beginning. - T.S. Eliot",
  "The best time to plant a tree was 20 years ago. The second best time is now. - Chinese Proverb",
  "Your future self will thank you for the choices you make today. - Anonymous",
  "Discipline is choosing between what you want now and what you want most. - Abraham Lincoln",
  "The pain of discipline is far less than the pain of regret. - Anonymous"
];

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const reason = urlParams.get('reason');
const match = urlParams.get('match');
const blockedUrl = urlParams.get('url');

// Display reason
const reasonEl = document.getElementById('reason');
if (reason === 'domain') {
  reasonEl.textContent = `Domain blocked: ${match}`;
} else if (reason === 'keyword_domain') {
  reasonEl.textContent = `Domain contains blocked keyword: ${match}`;
} else if (reason === 'keyword_path') {
  reasonEl.textContent = `URL contains explicit content pattern`;
} else if (reason === 'keyword_context') {
  reasonEl.textContent = `URL contains multiple NSFW indicators`;
} else if (reason === 'search_query') {
  reasonEl.textContent = `Search blocked: "${match}" in query`;
} else if (reason === 'search_images') {
  reasonEl.textContent = `Image search blocked: "${match}"`;
} else if (reason === 'keyword_content') {
  reasonEl.textContent = `Page content blocked: ${match}`;
} else {
  reasonEl.textContent = 'This page was blocked to help you stay focused.';
}

// Display random quote
const quoteEl = document.getElementById('quote');
quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];

// Load and display stats
chrome.runtime.sendMessage({ action: 'getStats' }, (response) => {
  if (chrome.runtime.lastError) {
    console.error('Error loading stats:', chrome.runtime.lastError);
    return;
  }
  
  if (response && response.stats) {
    const stats = response.stats;
    
    // Total blocks
    document.getElementById('totalBlocks').textContent = stats.totalBlocks || 0;
    
    // Days since install
    if (stats.installDate) {
      const installDate = new Date(stats.installDate);
      const now = new Date();
      const daysDiff = Math.floor((now - installDate) / (1000 * 60 * 60 * 24));
      document.getElementById('daysClean').textContent = daysDiff;
    }
  }
});

// Handle "Go to Safe Page" button
document.getElementById('goBackBtn').addEventListener('click', () => {
  // Redirect to a safe page (Google homepage or new tab)
  // Try to open new tab first, fallback to Google homepage
  try {
    chrome.tabs.getCurrent((tab) => {
      if (tab && tab.id) {
        // Update current tab to Google homepage
        chrome.tabs.update(tab.id, { url: 'https://www.google.com' });
      } else {
        // Fallback: just navigate to Google
        window.location.href = 'https://www.google.com';
      }
    });
  } catch (error) {
    // If chrome.tabs API fails, just navigate to Google
    window.location.href = 'https://www.google.com';
  }
});
