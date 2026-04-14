// GG Gamestore – productDetails.js

async function initProductDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    showError('No product ID provided.');
    return;
  }

  if (!isLoggedIn()) {
    showLoginPrompt();
    return;
  }

  showLoading(true);

  try {
    const res = await fetch(`${API_BASE}/games/${id}`, {
      headers: { 'Authorization': getToken() },
    });
    if (!res.ok) throw new Error('Game not found');
    const game = await res.json();
    renderProduct(game);
    fetchRelated(game.genre || '', id);
  } catch (err) {
    showError('Failed to load product: ' + err.message);
  } finally {
    showLoading(false);
  }
}

function renderProduct(game) {
  const name    = game.name || game.title || 'Unknown';
  const price   = parseFloat(game.price || 0).toFixed(2);
  const genre   = game.genre || '';
  const image   = game.image || game.cover || game.image_url || '';
  const rating  = parseFloat(game.rating || 0);
  const desc    = game.description || game.summary || 'No description available.';
  const release = game.release_date || game.year || '';
  const id      = game.id;

  document.title = name + ' – GG Gamestore';

  const wishlist   = getWishlist();
  const inWishlist = wishlist.some(w => w.id === id);

  // Hero image
  const heroImg = document.getElementById('productHeroImg');
  if (heroImg) {
    heroImg.src = image;
    heroImg.alt = name;
    heroImg.onerror = () => { heroImg.src = '../images/dummy_we-will-fix-this-soon.png'; };
  }

  // Name & meta
  setInner('productName', name);
  setInner('productGenre', genre ? `<span class="badge badge-primary">${genre}</span>` : '');
  setInner('productRelease', release ? `<i class="fas fa-calendar-alt"></i> ${release}` : '');
  setInner('productRating', renderStars(rating));
  setInner('productPrice', `${price} <small style="font-size:0.6em;">KM</small>`);
  setInner('productDescription', desc);

  // Add to cart button
  const cartBtn = document.getElementById('addToCartBtn');
  if (cartBtn) {
    cartBtn.onclick = () => {
      addToCart({ id, name, price, image, type: 'game' });
      showToast(`"${name}" added to cart!`, 'success');
    };
  }

  // Wishlist button
  const wBtn = document.getElementById('wishlistBtn');
  if (wBtn) {
    wBtn.classList.toggle('active', inWishlist);
    wBtn.innerHTML = `<i class="fa${inWishlist ? 's' : 'r'} fa-heart"></i> ${inWishlist ? 'In Wishlist' : 'Add to Wishlist'}`;
    wBtn.onclick = () => toggleWishlist({ id, name, price, image, type: 'game' }, wBtn);
  }

  // System requirements (dummy)
  setInner('sysReqs', `
    <div class="grid-2" style="gap:16px; font-size:0.85rem;">
      <div class="glass-panel p-16">
        <h5 style="font-family:var(--font-head); font-size:0.7rem; color:var(--primary); margin-bottom:12px;">MINIMUM</h5>
        <p><span class="text-muted">OS:</span> Windows 10 64-bit</p>
        <p><span class="text-muted">CPU:</span> Intel Core i5-8600K</p>
        <p><span class="text-muted">RAM:</span> 8 GB</p>
        <p><span class="text-muted">GPU:</span> GTX 1060 6GB</p>
        <p><span class="text-muted">Storage:</span> 50 GB SSD</p>
      </div>
      <div class="glass-panel p-16">
        <h5 style="font-family:var(--font-head); font-size:0.7rem; color:var(--primary); margin-bottom:12px;">RECOMMENDED</h5>
        <p><span class="text-muted">OS:</span> Windows 11 64-bit</p>
        <p><span class="text-muted">CPU:</span> Intel Core i7-10700K</p>
        <p><span class="text-muted">RAM:</span> 16 GB</p>
        <p><span class="text-muted">GPU:</span> RTX 3070 8GB</p>
        <p><span class="text-muted">Storage:</span> 50 GB NVMe</p>
      </div>
    </div>
  `);

  // Reveal the content
  const content = document.getElementById('productContent');
  if (content) content.style.display = 'block';
}

async function fetchRelated(genre, excludeId) {
  if (!genre) return;
  try {
    const res = await fetch(`${API_BASE}/games`, {
      headers: { 'Authorization': getToken() },
    });
    if (!res.ok) return;
    const games = await res.json();
    const related = games
      .filter(g => (g.genre || '') === genre && String(g.id) !== String(excludeId))
      .slice(0, 3);
    renderRelated(related);
  } catch (e) { /* ignore */ }
}

function renderRelated(games) {
  const el = document.getElementById('relatedGames');
  if (!el || games.length === 0) return;

  document.getElementById('relatedSection').style.display = 'block';
  el.innerHTML = games.map(g => {
    const name  = g.name || g.title || 'Unknown';
    const price = parseFloat(g.price || 0).toFixed(2);
    const image = g.image || g.cover || '';
    return `
      <a href="ProductDetails.html?id=${g.id}" class="gg-card" style="text-decoration:none;">
        <img class="gg-card__img" src="${image}" alt="${name}"
          onerror="this.src='../images/dummy_we-will-fix-this-soon.png'">
        <div class="gg-card__body">
          <div class="gg-card__title" title="${name}">${name}</div>
          <div class="gg-card__price">${price} KM</div>
        </div>
      </a>
    `;
  }).join('');
}

function renderStars(rating) {
  if (!rating) return '<span class="text-muted">No rating</span>';
  const full  = Math.floor(rating);
  const half  = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '<i class="fas fa-star"></i>'.repeat(full)
    + (half ? '<i class="fas fa-star-half-alt"></i>' : '')
    + '<i class="far fa-star empty"></i>'.repeat(empty)
    + `<span style="margin-left:6px; font-size:0.85rem; color:var(--text-muted);">${rating.toFixed(1)}</span>`;
}

function setInner(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function showLoading(show) {
  const el = document.getElementById('loadingSpinner');
  if (el) el.style.display = show ? 'flex' : 'none';
}

function showError(msg) {
  showLoading(false);
  const el = document.getElementById('errorMessage');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}

function showLoginPrompt() {
  showLoading(false);
  const el = document.getElementById('loginPrompt');
  if (el) el.style.display = 'block';
}

// Wishlist helpers
const WISHLIST_KEY = 'gg_wishlist';

function getWishlist() {
  try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; } catch { return []; }
}

function toggleWishlist(product, btn) {
  const list = getWishlist();
  const idx  = list.findIndex(w => w.id === product.id);
  if (idx >= 0) {
    list.splice(idx, 1);
    btn.classList.remove('active');
    btn.innerHTML = '<i class="far fa-heart"></i> Add to Wishlist';
    showToast('Removed from wishlist', 'info');
  } else {
    list.push(product);
    btn.classList.add('active');
    btn.innerHTML = '<i class="fas fa-heart"></i> In Wishlist';
    showToast(`"${product.name}" added to wishlist!`, 'success');
  }
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
}

// Toast
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

document.addEventListener('DOMContentLoaded', initProductDetails);
