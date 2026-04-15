async function register(username, email, password) {
  const res = await fetch(`${API_BASE}/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;
}

async function login(username, password) {
  const res = await fetch(`${API_BASE}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  localStorage.setItem('gg_token', data.token);
  localStorage.setItem('gg_username', username);
  return data;
}

function logout() {
  localStorage.removeItem('gg_token');
  localStorage.removeItem('gg_username');
  localStorage.removeItem('gg_cart');
  window.location.href = '/index.html';
}

function getToken() {
  return localStorage.getItem('gg_token');
}

function isLoggedIn() {
  return !!localStorage.getItem('gg_token');
}

function getCurrentUser() {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (e) {
    return null;
  }
}

function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = '/html/login.html';
  }
}

// Update navbar auth state after DOM loads
function updateNavAuth() {
  const loginLink = document.getElementById('navLogin');
  const logoutBtn = document.getElementById('navLogout');
  const myAccLink = document.getElementById('navMyAccount');
  const usernameDisplay = document.getElementById('navUsername');

  if (isLoggedIn()) {
    if (loginLink) loginLink.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'inline-flex';
    if (myAccLink) myAccLink.style.display = 'inline-flex';
    if (usernameDisplay) {
      const user = getCurrentUser();
      usernameDisplay.textContent = user ? user.username : '';
      usernameDisplay.style.display = 'inline';
    }
  } else {
    if (loginLink) loginLink.style.display = 'inline-flex';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (myAccLink) myAccLink.style.display = 'none';
    if (usernameDisplay) usernameDisplay.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', updateNavAuth);
