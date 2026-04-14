// GG Gamestore – gamesList.js

let allGames = [];
let filteredGames = [];
let currentPage = 1;
const PAGE_SIZE = 12;
let searchDebounceTimer = null;

async function initGamesList() {
  requireAuth();

  setupSearchBar();
  setupFilters();
  setupSort();
  showSkeletons();

  try {
    const res = await fetch(`${API_BASE}/games`, {
      headers: { 'Authorization': getToken() },
    });
    if (!res.ok) throw new Error('Failed to load games');
    allGames = await res.json();
    filteredGames = [...allGames];
    applyFilters();
  } catch (err) {
    showToast('Failed to load games: ' + err.message, 'error');
    hideSkeletons();
    document.getElementById('noResults').style.display = 'block';
  }
}

// ---------- Search ----------
function setupSearchBar() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  input.addEventListener('input', () => {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => performSearch(input.value.trim()), 400);
  });
}

async function performSearch(term) {
  if (!term) {
    filteredGames = [...allGames];
    applyFilters();
    return;
  }
  showSkeletons();
  try {
    const res = await fetch(`${API_BASE}/games/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': getToken() },
      body: JSON.stringify({ searchTerm: term }),
    });
    if (!res.ok) throw new Error('Search failed');
    filteredGames = await res.json();
  } catch (err) {
    // Fallback: client-side search
    const t = term.toLowerCase();
    filteredGames = allGames.filter(g =>
      (g.name || g.title || '').toLowerCase().includes(t) ||
      (g.genre || '').toLowerCase().includes(t)
    );
  }
  currentPage = 1;
  renderGames(filteredGames);
}

// ---------- Filters ----------
function setupFilters() {
  document.querySelectorAll('.genre-checkbox').forEach(cb => {
    cb.addEventListener('change', () => { currentPage = 1; applyFilters(); });
  });
}

function applyFilters() {
  const checked = Array.from(document.querySelectorAll('.genre-checkbox:checked')).map(c => c.value.toLowerCase());
  const term = (document.getElementById('searchInput')?.value || '').trim().toLowerCase();

  let games = term
    ? filteredGames
    : [...allGames];

  if (checked.length > 0) {
    games = games.filter(g => checked.includes((g.genre || '').toLowerCase()));
  }

  applySort(games);
}

// ---------- Sort ----------
function setupSort() {
  const sel = document.getElementById('sortSelect');
  if (sel) sel.addEventListener('change', () => applyFilters());
}

function applySort(games) {
  const sel = document.getElementById('sortSelect');
  const val = sel ? sel.value : 'default';

  const sorted = [...games];
  switch (val) {
    case 'price-asc':   sorted.sort((a, b) => parseFloat(a.price||0) - parseFloat(b.price||0)); break;
    case 'price-desc':  sorted.sort((a, b) => parseFloat(b.price||0) - parseFloat(a.price||0)); break;
    case 'name-asc':    sorted.sort((a, b) => (a.name||a.title||'').localeCompare(b.name||b.title||'')); break;
    case 'rating-desc': sorted.sort((a, b) => parseFloat(b.rating||0) - parseFloat(a.rating||0)); break;
  }

  filteredGames = sorted;
  renderGames(filteredGames);
}

// ---------- Render ----------
function renderGames(games) {
  hideSkeletons();
  const grid = document.getElementById('gamesGrid');
  const noResults = document.getElementById('noResults');

  if (!grid) return;

  if (games.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    document.getElementById('pagination').innerHTML = '';
    return;
  }

  noResults.style.display = 'none';
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = games.slice(start, start + PAGE_SIZE);

  grid.innerHTML = pageItems.map(game => buildGameCard(game)).join('');
  renderPagination(games.length);
}

function buildGameCard(game) {
  const id = game.id;
  const name = game.name || game.title || 'Unknown';
  const price = parseFloat(game.price || 0).toFixed(2);
  const genre = game.genre || '';
  const image = game.image || game.cover || game.image_url || '';
  const rating = game.rating || '';
  const wishlist = getWishlist();
  const inWishlist = wishlist.some(w => w.id === id);

  const stars = rating ? renderStars(parseFloat(rating)) : '';

  return `
    <div class="gg-card fade-in" data-id="${id}">
      <div style="position:relative;">
        <img class="gg-card__img" src="${image}" alt="${name}"
          onerror="this.src='../images/dummy_we-will-fix-this-soon.png'">
        <button class="wishlist-btn ${inWishlist ? 'active' : ''}"
          style="position:absolute;top:10px;right:10px;"
          onclick="toggleWishlist(event, ${JSON.stringify({id, name, price, image, type:'game'}).replace(/"/g,'&quot;')})">
          <i class="fa${inWishlist ? 's' : 'r'} fa-heart"></i>
        </button>
      </div>
      <div class="gg-card__body">
        ${genre ? `<span class="badge badge-primary mb-8">${genre}</span>` : ''}
        <div class="gg-card__title" title="${name}">${name}</div>
        ${stars ? `<div class="stars mb-8">${stars}</div>` : ''}
        <div class="gg-card__price">${price} KM</div>
        <div class="gg-card__actions">
          <a href="ProductDetails.html?id=${id}" class="btn btn-outline btn-sm" style="flex:1;text-align:center;">
            <i class="fas fa-info-circle"></i> More Info
          </a>
          <button class="btn btn-cta btn-sm" style="flex:1;"
            onclick="handleAddToCart({id:${id},name:${JSON.stringify(name)},price:${price},image:${JSON.stringify(image)},type:'game'})">
            <i class="fas fa-cart-plus"></i> Add
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '<i class="fas fa-star"></i>'.repeat(full)
    + (half ? '<i class="fas fa-star-half-alt"></i>' : '')
    + '<i class="far fa-star empty"></i>'.repeat(empty);
}

// ---------- Pagination ----------
function renderPagination(total) {
  const pages = Math.ceil(total / PAGE_SIZE);
  const el = document.getElementById('pagination');
  if (!el || pages <= 1) { if (el) el.innerHTML = ''; return; }

  let html = '';
  if (currentPage > 1) html += `<button onclick="goPage(${currentPage - 1})"><i class="fas fa-chevron-left"></i></button>`;

  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || Math.abs(i - currentPage) <= 2) {
      html += `<button class="${i === currentPage ? 'active' : ''}" onclick="goPage(${i})">${i}</button>`;
    } else if (Math.abs(i - currentPage) === 3) {
      html += `<button disabled>…</button>`;
    }
  }

  if (currentPage < pages) html += `<button onclick="goPage(${currentPage + 1})"><i class="fas fa-chevron-right"></i></button>`;
  el.innerHTML = `<div class="pagination">${html}</div>`;
}

function goPage(n) {
  currentPage = n;
  renderGames(filteredGames);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------- Cart ----------
function handleAddToCart(product) {
  addToCart(product);
  showToast(`"${product.name}" added to cart!`, 'success');
}

// ---------- Wishlist ----------
const WISHLIST_KEY = 'gg_wishlist';

function getWishlist() {
  try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; } catch { return []; }
}

function toggleWishlist(event, product) {
  event.stopPropagation();
  const list = getWishlist();
  const idx = list.findIndex(w => w.id === product.id);
  if (idx >= 0) {
    list.splice(idx, 1);
    showToast('Removed from wishlist', 'info');
  } else {
    list.push(product);
    showToast(`"${product.name}" added to wishlist!`, 'success');
  }
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));

  // Update button
  const btn = event.currentTarget;
  const inWishlist = list.some(w => w.id === product.id);
  btn.classList.toggle('active', inWishlist);
  btn.innerHTML = `<i class="fa${inWishlist ? 's' : 'r'} fa-heart"></i>`;
}

// ---------- Skeletons ----------
function showSkeletons() {
  const grid = document.getElementById('gamesGrid');
  if (!grid) return;
  grid.innerHTML = Array(8).fill(0).map(() => `
    <div class="skeleton-card">
      <div class="skeleton skeleton-img"></div>
      <div class="skeleton skeleton-line mt-8"></div>
      <div class="skeleton skeleton-line short"></div>
      <div class="skeleton skeleton-line tall short"></div>
      <div class="skeleton skeleton-btn"></div>
    </div>
  `).join('');
  document.getElementById('noResults').style.display = 'none';
}

function hideSkeletons() {
  // renderGames replaces content; nothing extra needed
}

// ---------- Toast ----------
function showToast(msg, type = 'info') {
  let container = document.querySelector('.gg-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'gg-toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `gg-toast ${type}`;
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle', warning: 'fa-exclamation-triangle' };
  toast.innerHTML = `<i class="fas ${icons[type] || 'fa-info-circle'}"></i><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 320);
  }, 3000);
}

document.addEventListener('DOMContentLoaded', initGamesList);
