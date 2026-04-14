// GG Gamestore – myAcc.js

async function initMyAccount() {
  requireAuth();

  const user = getCurrentUser();
  if (user) {
    setInner('welcomeName', user.username || 'Gamer');
    setInner('avatarInitial', (user.username || 'G')[0].toUpperCase());
  }

  setupTabs();
  await loadProfile();
  loadWishlist();
  loadOrders();
}

// ---------- Profile ----------
async function loadProfile() {
  try {
    const res = await fetch(`${API_BASE}/user/me`, {
      headers: { 'Authorization': getToken() },
    });
    if (!res.ok) throw new Error('Could not load profile');
    const profile = await res.json();

    setVal('dispUsername', profile.username || '');
    setVal('dispEmail',    profile.email    || '');
    setVal('dispAddress',  profile.address  || '');
    setVal('dispFirstName',profile.first_name || '');
    setVal('dispLastName', profile.last_name  || '');

    setInner('overviewUsername', profile.username || '');
    setInner('overviewEmail',    profile.email    || '');

    // Pre-fill edit forms
    setVal('editEmail',    profile.email    || '');
    setVal('editAddress',  profile.address  || '');
    setVal('editFirstName',profile.first_name || '');
    setVal('editLastName', profile.last_name  || '');

  } catch (e) {
    const user = getCurrentUser();
    if (user) {
      setInner('overviewUsername', user.username || '');
      setInner('overviewEmail',    user.email    || '');
    }
  }
}

// ---------- Wishlist ----------
function loadWishlist() {
  const list = getWishlist();
  const el   = document.getElementById('wishlistGrid');
  if (!el) return;

  if (list.length === 0) {
    el.innerHTML = '<div class="empty-state"><i class="fas fa-heart"></i><h3>Your wishlist is empty</h3><p>Browse games and click the heart icon!</p></div>';
    return;
  }

  el.innerHTML = list.map(item => `
    <div class="gg-card">
      <img class="gg-card__img" src="${item.image || ''}" alt="${item.name}"
        onerror="this.src='../images/dummy_we-will-fix-this-soon.png'">
      <div class="gg-card__body">
        <div class="gg-card__title">${item.name}</div>
        <div class="gg-card__price">${parseFloat(item.price||0).toFixed(2)} KM</div>
        <div class="gg-card__actions">
          <a href="ProductDetails.html?id=${item.id}" class="btn btn-outline btn-sm" style="flex:1;">
            <i class="fas fa-info-circle"></i> Details
          </a>
          <button class="btn btn-cta btn-sm" onclick="addWishlistToCart(${JSON.stringify(item).replace(/"/g,'&quot;')})">
            <i class="fas fa-cart-plus"></i>
          </button>
          <button class="btn btn-ghost btn-sm" onclick="removeFromWishlist(${item.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function addWishlistToCart(item) {
  addToCart(item);
  showToast(`"${item.name}" added to cart!`, 'success');
}

function removeFromWishlist(id) {
  const list = getWishlist().filter(w => w.id !== id);
  localStorage.setItem('gg_wishlist', JSON.stringify(list));
  loadWishlist();
  showToast('Removed from wishlist', 'info');
}

function getWishlist() {
  try { return JSON.parse(localStorage.getItem('gg_wishlist')) || []; } catch { return []; }
}

// ---------- Orders ----------
async function loadOrders() {
  const tbody = document.getElementById('ordersBody');
  const empty = document.getElementById('ordersEmpty');
  if (!tbody) return;

  try {
    const res = await fetch(`${API_BASE}/orders/my`, {
      headers: { 'Authorization': getToken() },
    });
    const orders = res.ok ? await res.json() : [];

    if (!orders || orders.length === 0) {
      tbody.closest('table').style.display = 'none';
      if (empty) empty.style.display = 'block';
      return;
    }

    tbody.innerHTML = orders.map(order => {
      const date = order.created_at ? new Date(order.created_at).toLocaleDateString() : '—';
      const items = (() => {
        try { return JSON.parse(order.items || '[]'); } catch { return []; }
      })();
      return `
        <tr>
          <td style="font-family:monospace; font-size:0.8rem;">${(order.id || '').slice(0,12)}…</td>
          <td>${date}</td>
          <td>${items.length} item${items.length !== 1 ? 's' : ''}</td>
          <td><span style="font-weight:700; color:var(--success);">${parseFloat(order.total||0).toFixed(2)} KM</span></td>
          <td><span class="badge badge-success">${order.status || 'confirmed'}</span></td>
        </tr>
      `;
    }).join('');
  } catch (e) {
    if (empty) { empty.style.display = 'block'; empty.textContent = 'Could not load orders.'; }
  }
}

// ---------- Edit Profile ----------
function setupEditForms() {
  // Email
  document.getElementById('saveEmailBtn')?.addEventListener('click', async () => {
    const email = document.getElementById('editEmail')?.value.trim();
    const user  = getCurrentUser();
    if (!email || !user) return;
    try {
      const res = await fetch(`${API_BASE}/user/changeEmail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username, email }),
      });
      if (!res.ok) throw new Error();
      showToast('Email updated!', 'success');
    } catch { showToast('Failed to update email', 'error'); }
  });

  // Password
  document.getElementById('savePasswordBtn')?.addEventListener('click', async () => {
    const pwd  = document.getElementById('editPassword')?.value;
    const conf = document.getElementById('editPasswordConfirm')?.value;
    const user = getCurrentUser();
    if (!pwd || !user) return;
    if (pwd !== conf) { showToast('Passwords do not match', 'error'); return; }
    if (pwd.length < 6) { showToast('Password too short', 'error'); return; }
    try {
      const res = await fetch(`${API_BASE}/user/changePassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username, password: pwd }),
      });
      if (!res.ok) throw new Error();
      showToast('Password updated!', 'success');
      document.getElementById('editPassword').value = '';
      document.getElementById('editPasswordConfirm').value = '';
    } catch { showToast('Failed to update password', 'error'); }
  });

  // Address
  document.getElementById('saveAddressBtn')?.addEventListener('click', async () => {
    const address = document.getElementById('editAddress')?.value.trim();
    const user    = getCurrentUser();
    if (!address || !user) return;
    try {
      const res = await fetch(`${API_BASE}/user/changeAddress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username, address }),
      });
      if (!res.ok) throw new Error();
      showToast('Address updated!', 'success');
    } catch { showToast('Failed to update address', 'error'); }
  });
}

// ---------- Tabs ----------
function setupTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById('tab_' + target);
      if (panel) panel.classList.add('active');
    });
  });
}

// ---------- Helpers ----------
function setInner(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val;
}

function showToast(msg, type = 'info') {
  let container = document.querySelector('.gg-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'gg-toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `gg-toast ${type}`;
  const icons = { success:'fa-check-circle', error:'fa-times-circle', info:'fa-info-circle' };
  toast.innerHTML = `<i class="fas ${icons[type]||'fa-info-circle'}"></i><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.classList.add('hiding'); setTimeout(() => toast.remove(), 320); }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  initMyAccount();
  setupEditForms();
});
