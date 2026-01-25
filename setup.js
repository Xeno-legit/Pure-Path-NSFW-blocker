// Setup page script
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const goalInput = document.getElementById('goal');
const consentCheckbox = document.getElementById('consent');
const setupBtn = document.getElementById('setupBtn');
const errorMessage = document.getElementById('errorMessage');

// Enable button when consent is checked
consentCheckbox.addEventListener('change', () => {
  setupBtn.disabled = !consentCheckbox.checked;
});

setupBtn.addEventListener('click', async () => {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  const goal = goalInput.value;
  
  // Validation
  if (!password || !confirmPassword) {
    errorMessage.textContent = 'Please enter and confirm your password';
    return;
  }
  
  if (password.length < 6) {
    errorMessage.textContent = 'Password must be at least 6 characters';
    return;
  }
  
  if (password !== confirmPassword) {
    errorMessage.textContent = 'Passwords do not match';
    return;
  }
  
  // Hash password
  const hash = await hashPassword(password);
  
  // Save to storage
  chrome.storage.local.set({
    passwordHash: hash,
    userGoal: goal,
    setupComplete: true,
    stats: {
      totalBlocks: 0,
      installDate: new Date().toISOString()
    }
  }, () => {
    if (chrome.runtime.lastError) {
      errorMessage.textContent = 'Error saving settings. Please try again.';
      console.error('Setup error:', chrome.runtime.lastError);
      return;
    }
    
    // Close setup and open popup
    window.close();
  });
});
