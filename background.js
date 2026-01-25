// Background service worker for Pure Path
let isExtensionEnabled = true;
let passwordHash = null;
let blocklistDomains = [];
let blocklistKeywords = [];
let stats = {
  totalBlocks: 0,
  installDate: null,
  lastBlockDate: null
};

// Initialize extension
chrome.runtime.onInstalled.addListener(async (details) => {
  console.log('Pure Path installed');
  
  // On first install or update, load blocklists from JSON and save to storage
  if (details.reason === 'install' || details.reason === 'update') {
    await initializeBlocklistsFromJSON();
  }
  
  // Load blocklists from storage
  await loadBlocklistsFromStorage();
  
  // Load or initialize stats
  const result = await chrome.storage.local.get(['stats']);
  if (result.stats) {
    stats = result.stats;
  } else {
    stats.installDate = new Date().toISOString();
    await chrome.storage.local.set({ stats });
  }
  
  // Check if password is set
  const { passwordHash: storedHash } = await chrome.storage.local.get(['passwordHash']);
  if (!storedHash) {
    // Open setup page
    chrome.tabs.create({ url: 'setup.html' });
  }
});

// Load blocklists on startup
chrome.runtime.onStartup.addListener(async () => {
  console.log('Pure Path starting up');
  await loadBlocklistsFromStorage();
  
  // Load stats from storage
  const result = await chrome.storage.local.get(['stats']);
  if (result.stats) {
    stats = result.stats;
  }
});

// Initialize blocklists from JSON files (only on install/update)
async function initializeBlocklistsFromJSON() {
  try {
    console.log('📋 Pure Path: Initializing blocklists from JSON files...');
    const domainsResponse = await fetch(chrome.runtime.getURL('blocklists/domains.json'));
    const domainsData = await domainsResponse.json();
    const domains = domainsData.domains || [];
    
    const keywordsResponse = await fetch(chrome.runtime.getURL('blocklists/keywords.json'));
    const keywordsData = await keywordsResponse.json();
    const keywords = keywordsData.keywords || [];
    
    // Save to storage
    await chrome.storage.local.set({ 
      blocklistDomains: domains,
      blocklistKeywords: keywords
    });
    
    console.log(`✅ Pure Path: Initialized ${domains.length} domains and ${keywords.length} keywords in storage`);
  } catch (error) {
    console.error('❌ Pure Path: Error initializing blocklists from JSON:', error);
  }
}

// Load blocklists from Chrome storage
async function loadBlocklistsFromStorage() {
  try {
    console.log('📋 Pure Path: Loading blocklists from storage...');
    const result = await chrome.storage.local.get(['blocklistDomains', 'blocklistKeywords']);
    
    if (result.blocklistDomains && result.blocklistKeywords) {
      blocklistDomains = result.blocklistDomains;
      blocklistKeywords = result.blocklistKeywords;
      console.log(`✅ Pure Path: Loaded ${blocklistDomains.length} domains and ${blocklistKeywords.length} keywords from storage`);
    } else {
      // If not in storage, initialize from JSON
      console.log('⚠️ Pure Path: Blocklists not found in storage, initializing from JSON...');
      await initializeBlocklistsFromJSON();
      await loadBlocklistsFromStorage(); // Reload after initialization
    }
  } catch (error) {
    console.error('❌ Pure Path: Error loading blocklists from storage:', error);
  }
}

// Load blocklists from JSON files (legacy function, kept for compatibility)
async function loadBlocklists() {
  await loadBlocklistsFromStorage();
}

// ============================================================================
// ENHANCED LEET SPEAK NORMALIZER (for search queries only)
// ============================================================================

function normalizeLeetSpeak(text) {
  if (!text) return '';
  
  let normalized = text.toLowerCase();
  
  console.log('🔤 Leet Speak Normalization:');
  console.log('  Input:', text);
  
  // Remove common separator characters FIRST
  normalized = normalized.replace(/[-_\.\s]/g, '');
  console.log('  After separator removal:', normalized);
  
  // Leet speak character replacements (multiple passes for complex substitutions)
  const leetMap = {
    '0': 'o',
    '1': 'i',
    '3': 'e',
    '4': 'a',
    '5': 's',
    '7': 't',
    '8': 'b',
    '9': 'g',
    '@': 'a',
    '$': 's',
    '!': 'i',
    '|': 'l',
    '(': 'c',
    ')': 'c',
    '<': 'c',
    '>': 'c',
    '+': 't',
    '&': 'and',
    '€': 'e',
    '£': 'l',
    '¥': 'y',
    '§': 's',
    '©': 'c',
    '®': 'r',
    '™': 't',
    '°': 'o',
    '²': '2',
    '³': '3',
    'µ': 'u',
    '¶': 'p',
    '×': 'x',
    '÷': 'd'
  };
  
  // Replace leet speak characters (do multiple passes)
  for (let pass = 0; pass < 3; pass++) {
    for (const [leet, normal] of Object.entries(leetMap)) {
      // Escape special regex characters
      const escapedLeet = leet.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      normalized = normalized.replace(new RegExp(escapedLeet, 'g'), normal);
    }
  }
  
  console.log('  After leet speak conversion:', normalized);
  console.log('  Final normalized:', normalized);
  
  return normalized;
}

// ============================================================================
// ENHANCED MULTI-TIERED DETECTION SYSTEM
// ============================================================================

// TIER 1: WHITELIST - Completely safe domains (never block)
const WHITELIST_DOMAINS = [
  // Search engines & AI
  'google.com',
  'bing.com',
  'duckduckgo.com',
  'yahoo.com',
  'gemini.google.com',
  'bard.google.com',
  'openai.com',
  'anthropic.com',
  'claude.ai',
  'chatgpt.com',
  
  // Development & Tech
  'github.com',
  'gitlab.com',
  'stackoverflow.com',
  'stackexchange.com',
  'microsoft.com',
  'apple.com',
  'developer.mozilla.org',
  
  // Social Media (mainstream)
  'linkedin.com',
  
  // Education & Reference
  'wikipedia.org',
  'wikihow.com',
  'khanacademy.org',
  'coursera.org',
  'udemy.com',
  'edx.org',
  
  // E-commerce
  'amazon.com',
  'ebay.com',
  'walmart.com',
  'target.com',
  
  // News & Media
  'bbc.com',
  'cnn.com',
  'nytimes.com',
  'theguardian.com',
  'reuters.com'
];

// TIER 2: GRAYLIST - Can contain NSFW but not primary focus (strict monitoring)
const GRAYLIST_DOMAINS = [
  'reddit.com',
  'discord.com',
  'twitter.com',
  'x.com',
  'tumblr.com',
  'newgrounds.com',
  'deviantart.com',
  'instagram.com',
  'facebook.com',
  'pinterest.com',
  'imgur.com',
  'twitch.tv',
  'youtube.com'
];

// TIER 3: BLACKLIST - Explicit NSFW domains (always block)
// This will be loaded from blocklists/domains.json

// ============================================================================
// SEARCH QUERY DETECTION - Enhanced with Leet Speak Normalization
// ============================================================================

// Soft porn keywords (common bypass terms - less explicit)
const SOFT_PORN_KEYWORDS = [
  // Suggestive terms
  'sexy', 'hot babes', 'hot girls', 'hot women', 'hot chicks',
  'bikini babes', 'lingerie', 'underwear models', 'swimsuit models',
  'topless', 'bottomless', 'naked', 'nude', 'nudes',
  
  // Action terms
  'strip', 'stripping', 'stripper', 'striptease',
  'cam girl', 'camgirl', 'webcam girl', 'live cam',
  'onlyfans', 'only fans', 'patreon nsfw',
  
  // Euphemisms
  'adult content', 'mature content', '18+', 'nsfw',
  'not safe for work', 'explicit content'
];

// Explicit hard porn keywords (immediate block)
const HARD_PORN_KEYWORDS = [
  // Porn sites and terms
  'porn', 'pornography', 'pornhub', 'xvideos', 'xnxx', 'redtube',
  'hentai', 'doujin', 'rule34',
  'sex video', 'sex videos', 'porn video', 'porn videos',
  
  // Explicit body parts (moved from soft keywords)
  'boobs', 'boobies', 'tits', 'titties', 'breasts',
  'ass', 'butt', 'booty', 'pussy', 'vagina',
  'dick', 'cock', 'penis', 'balls', 'testicles',
  
  // Explicit acts
  'fuck', 'fucking', 'sex', 'sexual',
  'milf', 'gilf', 'dilf',
  'gangbang', 'orgy', 'threesome', 'foursome',
  'blowjob', 'handjob', 'footjob',
  'cumshot', 'creampie', 'facial',
  'lesbian porn', 'gay porn', 'shemale', 'trans porn',
  'incest', 'stepmom', 'stepsister', 'stepbrother',
  'rape', 'forced', 'bdsm', 'bondage'
];

// Contextual phrases that indicate NSFW intent
const NSFW_PHRASES = [
  'hot babes', 'sexy babes', 'hot girls', 'sexy girls',
  'hot women', 'sexy women', 'hot chicks', 'sexy chicks',
  'bikini babes', 'bikini girls', 'lingerie models',
  'nude models', 'naked models', 'topless models',
  'cam girls', 'webcam girls', 'live cams',
  'strip club', 'strip tease', 'lap dance',
  'adult entertainment', 'adult videos', 'adult content',
  'xxx videos', 'xxx images', 'xxx pics',
  'porn site', 'porn sites', 'sex site', 'sex sites',
  'free porn', 'free sex', 'free nudes',
  'watch porn', 'watch sex', 'download porn'
];

// ============================================================================
// SEARCH ENGINE DETECTION
// ============================================================================

const SEARCH_ENGINES = [
  { domain: 'google.com', queryParam: 'q', imageParam: 'tbm=isch' },
  { domain: 'bing.com', queryParam: 'q', imageParam: 'filters=filterui:photo' },
  { domain: 'duckduckgo.com', queryParam: 'q', imageParam: 'iax=images' },
  { domain: 'yahoo.com', queryParam: 'p', imageParam: 'fr2=piv-web' }
];

// ============================================================================
// ENHANCED SEARCH QUERY DETECTION WITH LEET SPEAK NORMALIZATION
// ============================================================================

function checkSearchEngineQuery(url, hostname) {
  const searchEngine = SEARCH_ENGINES.find(se => 
    hostname === se.domain || hostname.endsWith('.' + se.domain)
  );
  
  if (!searchEngine) return null;
  
  try {
    const urlObj = new URL(url);
    const searchParams = urlObj.searchParams;
    const query = searchParams.get(searchEngine.queryParam);
    
    if (!query) return null;
    
    const lowerQuery = query.toLowerCase();
    const isImageSearch = url.includes(searchEngine.imageParam);
    
    // Check if SafeSearch is enabled (block if user tries to use SafeSearch)
    const hasSafeSearch = url.includes('safe=') || url.includes('safesearch');
    if (hasSafeSearch) {
      console.log('🚫 SafeSearch detected - blocking to prevent bypass');
      return {
        blocked: true,
        reason: 'safesearch_bypass',
        match: 'SafeSearch enabled',
        query: query,
        severity: 'bypass_attempt'
      };
    }
    
    // Normalize leet speak in the query
    const normalizedQuery = normalizeLeetSpeak(lowerQuery);
    
    console.log('═══════════════════════════════════════════════════════');
    console.log('🔍 Search Query Analysis:');
    console.log('  Original:', lowerQuery);
    console.log('  Normalized:', normalizedQuery);
    console.log('  Image Search:', isImageSearch);
    console.log('  SafeSearch:', hasSafeSearch);
    console.log('═══════════════════════════════════════════════════════');
    
    // Check for hard porn keywords (immediate block)
    console.log('Checking hard porn keywords...');
    for (const keyword of HARD_PORN_KEYWORDS) {
      const normalizedKeyword = keyword.toLowerCase().replace(/[-_\.\s]/g, '');
      if (normalizedQuery.includes(normalizedKeyword)) {
        console.log(`🚫 HARD PORN MATCH: "${keyword}" found in normalized query`);
        return {
          blocked: true,
          reason: isImageSearch ? 'search_images' : 'search_query',
          match: keyword,
          query: query,
          severity: 'explicit',
          normalized: normalizedQuery
        };
      }
    }
    
    // Check for NSFW phrases (contextual block)
    console.log('Checking NSFW phrases...');
    for (const phrase of NSFW_PHRASES) {
      const normalizedPhrase = normalizeLeetSpeak(phrase.toLowerCase());
      if (normalizedQuery.includes(normalizedPhrase)) {
        console.log(`🚫 NSFW PHRASE MATCH: "${phrase}" found in normalized query`);
        return {
          blocked: true,
          reason: isImageSearch ? 'search_images' : 'search_query',
          match: phrase,
          query: query,
          severity: 'contextual',
          normalized: normalizedQuery
        };
      }
    }
    
    // Check for soft porn keywords
    console.log('Checking soft porn keywords...');
    let softMatches = [];
    for (const keyword of SOFT_PORN_KEYWORDS) {
      const normalizedKeyword = keyword.toLowerCase().replace(/[-_\.\s]/g, '');
      if (normalizedQuery.includes(normalizedKeyword)) {
        softMatches.push(keyword);
        console.log(`  ⚠️ Soft match: "${keyword}"`);
      }
    }
    
    if (softMatches.length > 0) {
      console.log(`Found ${softMatches.length} soft porn keywords: ${softMatches.join(', ')}`);
      
      // Always block on image search with any soft keyword
      if (isImageSearch) {
        console.log(`🚫 IMAGE SEARCH BLOCK: Soft keyword "${softMatches[0]}" in image search`);
        return {
          blocked: true,
          reason: 'search_images',
          match: softMatches[0],
          query: query,
          severity: 'soft',
          normalized: normalizedQuery
        };
      }
      
      // For text search, block if 2+ soft keywords
      if (softMatches.length >= 2) {
        console.log(`🚫 MULTIPLE SOFT KEYWORDS: ${softMatches.length} keywords found`);
        return {
          blocked: true,
          reason: 'search_query',
          match: softMatches.join(', '),
          query: query,
          severity: 'soft',
          normalized: normalizedQuery
        };
      }
      
      console.log(`✅ Only 1 soft keyword, allowing for now`);
    }
    
    console.log('✅ Search query allowed');
    
  } catch (error) {
    console.error('❌ Error checking search query:', error);
  }
  
  return null;
}

// ============================================================================
// URL BLOCKING LOGIC WITH MULTI-TIER SYSTEM (Simplified)
// ============================================================================

function shouldBlockUrl(url) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    const fullUrl = url.toLowerCase();
    const pathname = urlObj.pathname.toLowerCase();
    
    console.log('═══════════════════════════════════════════════════════');
    console.log('🔍 Pure Path: URL Analysis');
    console.log('  Full URL:', url);
    console.log('  Hostname:', hostname);
    console.log('  Pathname:', pathname);
    console.log('═══════════════════════════════════════════════════════');
    
    // ========================================================================
    // STEP 1: Check search engine queries FIRST (with leet speak detection)
    // ========================================================================
    console.log('STEP 1: Checking search engine queries...');
    const searchCheck = checkSearchEngineQuery(url, hostname);
    if (searchCheck && searchCheck.blocked) {
      console.log('🚫 BLOCKED by search query detection');
      return searchCheck;
    }
    console.log('✅ Not a blocked search query');
    
    // ========================================================================
    // STEP 2: Check WHITELIST (never block these)
    // ========================================================================
    console.log('STEP 2: Checking whitelist...');
    for (const whitelistDomain of WHITELIST_DOMAINS) {
      if (hostname === whitelistDomain || hostname.endsWith('.' + whitelistDomain)) {
        console.log(`✅ WHITELISTED: Matched "${whitelistDomain}"`);
        return { blocked: false, tier: 'whitelist' };
      }
    }
    console.log('⚪ Not in whitelist');
    
    // ========================================================================
    // STEP 3: Check BLACKLIST (explicit NSFW domains)
    // ========================================================================
    console.log('STEP 3: Checking blacklist...');
    console.log(`  Blacklist has ${blocklistDomains.length} domains`);
    for (const domain of blocklistDomains) {
      const lowerDomain = domain.toLowerCase();
      if (hostname === lowerDomain || hostname.endsWith('.' + lowerDomain)) {
        console.log(`🚫 BLACKLISTED: Matched "${domain}"`);
        return { 
          blocked: true, 
          reason: 'blacklist_domain', 
          match: domain,
          tier: 'blacklist'
        };
      }
    }
    console.log('⚪ Not in blacklist');
    
    // ========================================================================
    // STEP 4: Check if domain contains explicit NSFW keywords
    // ========================================================================
    console.log('STEP 4: Checking domain for explicit keywords...');
    const domainKeywords = ['porn', 'xxx', 'sex', 'adult', 'hentai', 'xnxx', 'xvideos'];
    for (const keyword of domainKeywords) {
      if (hostname.includes(keyword)) {
        console.log(`🚫 EXPLICIT DOMAIN: Found "${keyword}" in hostname`);
        return { 
          blocked: true, 
          reason: 'explicit_domain', 
          match: keyword,
          tier: 'blacklist'
        };
      }
    }
    console.log('⚪ No explicit keywords in domain');
    
    // ========================================================================
    // STEP 5: Check GRAYLIST domains with basic monitoring
    // ========================================================================
    console.log('STEP 5: Checking graylist...');
    let isGraylist = false;
    for (const graylistDomain of GRAYLIST_DOMAINS) {
      if (hostname === graylistDomain || hostname.endsWith('.' + graylistDomain)) {
        isGraylist = true;
        console.log(`⚠️ GRAYLIST DOMAIN: Matched "${graylistDomain}"`);
        break;
      }
    }
    
    if (isGraylist) {
      // For graylist domains, check for explicit NSFW paths
      const explicitPaths = [
        '/porn', '/sex', '/nude', '/nsfw', '/adult', '/hentai', '/xxx',
        '/r/nsfw', '/r/porn', '/r/gonewild', '/r/sex', '/r/hentai',
        '/r/rule34', '/r/realgirls', '/r/ass', '/r/boobs', '/r/tits'
      ];
      
      console.log(`  Checking ${explicitPaths.length} explicit paths...`);
      for (const path of explicitPaths) {
        // Check if pathname starts with or contains the path
        if (pathname.includes(path)) {
          console.log(`🚫 GRAYLIST BLOCK: Found "${path}" in pathname "${pathname}"`);
          return { 
            blocked: true, 
            reason: 'graylist_explicit', 
            match: path,
            tier: 'graylist'
          };
        }
      }
      
      console.log(`✅ GRAYLIST ALLOW: No explicit paths found in "${pathname}"`);
      // Allow if no explicit NSFW paths found
      return { blocked: false, tier: 'graylist' };
    }
    console.log('⚪ Not in graylist');
    
    // ========================================================================
    // STEP 6: Check unknown domains for explicit patterns
    // ========================================================================
    console.log('STEP 6: Checking unknown domain for explicit patterns...');
    
    // Check for explicit patterns in path
    const explicitPatterns = [
      '/porn/', '/sex/', '/nude/', '/nsfw/', '/adult/', '/hentai/', '/xxx/'
    ];
    
    for (const pattern of explicitPatterns) {
      if (pathname.includes(pattern)) {
        console.log(`🚫 EXPLICIT PATH: Found "${pattern}" in pathname`);
        return { 
          blocked: true, 
          reason: 'explicit_path', 
          match: pattern,
          tier: 'unknown'
        };
      }
    }
    
    // Check for multiple explicit keywords in URL (need 2+)
    const explicitKeywords = ['porn', 'sex', 'nude', 'xxx', 'adult', 'nsfw', 'hentai'];
    let keywordCount = 0;
    let matchedKeywords = [];
    
    for (const keyword of explicitKeywords) {
      if (fullUrl.includes(keyword)) {
        keywordCount++;
        matchedKeywords.push(keyword);
      }
    }
    
    if (keywordCount >= 2) {
      console.log(`🚫 MULTIPLE KEYWORDS: Found ${keywordCount} keywords: ${matchedKeywords.join(', ')}`);
      return { 
        blocked: true, 
        reason: 'multiple_explicit', 
        match: matchedKeywords.join(', '),
        tier: 'unknown'
      };
    }
    
    // Allow if no NSFW indicators found
    console.log('✅ ALLOWED: No NSFW indicators found');
    console.log('═══════════════════════════════════════════════════════');
    return { blocked: false, tier: 'unknown' };
    
  } catch (error) {
    console.error('❌ Error checking URL:', error);
    return { blocked: false };
  }
}

// Handle web requests
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId !== 0) return; // Only check main frame
  
  // Don't block extension pages or chrome URLs
  if (details.url.startsWith('chrome://') || 
      details.url.startsWith('chrome-extension://') ||
      details.url.startsWith('about:') ||
      details.url.startsWith('edge://')) {
    return;
  }
  
  const { passwordHash: storedHash } = await chrome.storage.local.get(['passwordHash']);
  if (!storedHash) {
    console.log('⚠️ Pure Path: Setup not completed. Please complete setup to enable blocking.');
    return; // Not set up yet
  }
  
  console.log('🔍 Pure Path: Checking URL:', details.url);
  const result = shouldBlockUrl(details.url);
  
  if (result.blocked) {
    console.log('🚫 Pure Path: BLOCKED!', result.reason, result.match);
    // Increment stats
    stats.totalBlocks++;
    stats.lastBlockDate = new Date().toISOString();
    await chrome.storage.local.set({ stats });
    
    // Redirect to blocked page
    const blockedUrl = chrome.runtime.getURL('blocked.html') + 
      `?reason=${result.reason}&match=${encodeURIComponent(result.match)}&url=${encodeURIComponent(details.url)}`;
    chrome.tabs.update(details.tabId, { url: blockedUrl });
  } else {
    console.log('✅ Pure Path: URL allowed');
  }
});

// Listen for messages from content script and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getStats') {
    sendResponse({ stats });
    return true;
  }
  
  if (request.action === 'setPassword') {
    chrome.storage.local.set({ passwordHash: request.hash }, () => {
      if (chrome.runtime.lastError) {
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
      } else {
        passwordHash = request.hash;
        sendResponse({ success: true });
      }
    });
    return true;
  }
  
  if (request.action === 'verifyPassword') {
    chrome.storage.local.get(['passwordHash'], (result) => {
      if (chrome.runtime.lastError) {
        sendResponse({ valid: false, error: chrome.runtime.lastError.message });
      } else {
        sendResponse({ valid: result.passwordHash === request.hash });
      }
    });
    return true;
  }
  
  if (request.action === 'getBlocklists') {
    sendResponse({ 
      domains: blocklistDomains, 
      keywords: blocklistKeywords 
    });
    return true;
  }
  
  if (request.action === 'updateBlocklists') {
    // Update blocklists in storage
    const updates = {};
    if (request.domains !== undefined) {
      blocklistDomains = request.domains;
      updates.blocklistDomains = request.domains;
    }
    if (request.keywords !== undefined) {
      blocklistKeywords = request.keywords;
      updates.blocklistKeywords = request.keywords;
    }
    
    chrome.storage.local.set(updates, () => {
      if (chrome.runtime.lastError) {
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
      } else {
        console.log('✅ Pure Path: Blocklists updated in storage');
        sendResponse({ success: true });
      }
    });
    return true;
  }
  
  if (request.action === 'reloadBlocklists') {
    // Reload blocklists from storage
    loadBlocklistsFromStorage().then(() => {
      sendResponse({ success: true });
    }).catch(error => {
      sendResponse({ success: false, error: error.message });
    });
    return true;
  }
  
  return false;
});

// Remove the periodic reload since we're using storage now
// Blocklists will persist and load automatically
