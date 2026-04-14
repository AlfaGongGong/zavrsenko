// GG Gamestore – cart helpers (localStorage)

const CART_KEY = 'gg_cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCartBadge();
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
}

function updateQty(productId, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    item.qty = qty;
    saveCart(cart);
  }
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + (item.qty || 1), 0);
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + (parseFloat(item.price) || 0) * (item.qty || 1), 0);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  renderCartBadge();
}

function renderCartBadge() {
  const count = getCartCount();
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'inline-flex' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', renderCartBadge);
