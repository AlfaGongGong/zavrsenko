let currentStep = 1;
const TOTAL_STEPS = 4;

const customerData = {};
const paymentData  = {};

function initCheckout() {
  renderCartReview();
  bindStepButtons();
  setupCardFormatting();
  goToStep(1);
}

// ---------- Step navigation ----------
function goToStep(n) {
  if (n < 1 || n > TOTAL_STEPS) return;
  currentStep = n;

  document.querySelectorAll('.checkout-step').forEach((el, i) => {
    el.style.display = (i + 1 === n) ? 'block' : 'none';
  });

  // Progress indicator
  document.querySelectorAll('.step-item').forEach((el, i) => {
    el.classList.remove('active', 'completed');
    if (i + 1 < n)  el.classList.add('completed');
    if (i + 1 === n) el.classList.add('active');
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (n === 3) renderOrderReview();
}

function bindStepButtons() {
  document.getElementById('toStep2')?.addEventListener('click', () => {
    if (validateStep1()) goToStep(2);
  });
  document.getElementById('backToStep1')?.addEventListener('click', () => goToStep(1));
  document.getElementById('toStep3')?.addEventListener('click', () => {
    if (validateStep2()) goToStep(3);
  });
  document.getElementById('backToStep2')?.addEventListener('click', () => goToStep(2));
  document.getElementById('payNowBtn')?.addEventListener('click', processPayment);
}

// ---------- Step 1 validation ----------
function validateStep1() {
  const fields = ['firstName','lastName','email','address','city','postalCode','country'];
  let valid = true;
  fields.forEach(f => {
    const el = document.getElementById(`cust_${f}`);
    const errEl = document.getElementById(`err_${f}`);
    const val = el ? el.value.trim() : '';
    const empty = !val;
    if (errEl) errEl.classList.toggle('visible', empty);
    if (empty) valid = false;
    else { customerData[f] = val; }
  });
  if (customerData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) {
    const errEl = document.getElementById('err_email');
    if (errEl) { errEl.textContent = 'Enter a valid email.'; errEl.classList.add('visible'); }
    valid = false;
  }
  return valid;
}

// ---------- Step 2 validation ----------
function validateStep2() {
  const rawNum = (document.getElementById('cardNumber')?.value || '').replace(/\s/g,'');
  const expiry = document.getElementById('cardExpiry')?.value || '';
  const cvv     = document.getElementById('cardCVV')?.value || '';
  const holder  = document.getElementById('cardHolder')?.value.trim() || '';

  let valid = true;

  const numErr = document.getElementById('err_cardNumber');
  const expErr = document.getElementById('err_cardExpiry');
  const cvvErr = document.getElementById('err_cardCVV');
  const holErr = document.getElementById('err_cardHolder');

  if (rawNum.length < 13 || rawNum.length > 19) {
    if (numErr) numErr.classList.add('visible');
    valid = false;
  } else if (numErr) numErr.classList.remove('visible');

  if (!validateExpiry(expiry)) {
    if (expErr) expErr.classList.add('visible');
    valid = false;
  } else if (expErr) expErr.classList.remove('visible');

  if (cvv.length < 3 || cvv.length > 4) {
    if (cvvErr) cvvErr.classList.add('visible');
    valid = false;
  } else if (cvvErr) cvvErr.classList.remove('visible');

  if (!holder) {
    if (holErr) holErr.classList.add('visible');
    valid = false;
  } else if (holErr) holErr.classList.remove('visible');

  if (valid) {
    paymentData.cardNumber = rawNum;
    paymentData.expiry     = expiry;
    paymentData.cvv        = cvv;
    paymentData.holder     = holder;
    paymentData.type       = detectCardType(rawNum);
  }
  return valid;
}

function validateExpiry(val) {
  const match = val.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;
  const month = parseInt(match[1]);
  const year  = parseInt('20' + match[2]);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const expDate = new Date(year, month - 1, 1);
  return expDate > new Date(now.getFullYear(), now.getMonth(), 1);
}

// ---------- Card formatting ----------
function setupCardFormatting() {
  const numInput = document.getElementById('cardNumber');
  if (numInput) {
    numInput.addEventListener('input', e => {
      let val = e.target.value.replace(/\D/g,'').slice(0, 16);
      e.target.value = val.replace(/(.{4})/g,'$1 ').trim();
      updateCardTypeDisplay(detectCardType(val));
    });
  }

  const expInput = document.getElementById('cardExpiry');
  if (expInput) {
    expInput.addEventListener('input', e => {
      let val = e.target.value.replace(/\D/g,'');
      if (val.length >= 2) val = val.slice(0,2) + '/' + val.slice(2,4);
      e.target.value = val;
    });
  }

  const cvvInput = document.getElementById('cardCVV');
  if (cvvInput) {
    cvvInput.addEventListener('input', e => {
      e.target.value = e.target.value.replace(/\D/g,'').slice(0,4);
    });
  }
}

function detectCardType(num) {
  if (/^4/.test(num))     return 'Visa';
  if (/^5[1-5]/.test(num)) return 'Mastercard';
  if (/^3[47]/.test(num)) return 'Amex';
  return 'Card';
}

function updateCardTypeDisplay(type) {
  const el = document.getElementById('cardTypeDisplay');
  if (!el) return;
  const icons = { Visa: 'fab fa-cc-visa', Mastercard: 'fab fa-cc-mastercard', Amex: 'fab fa-cc-amex', Card: 'fas fa-credit-card' };
  el.innerHTML = `<i class="${icons[type] || icons.Card}" style="font-size:1.4rem; color:var(--primary);"></i> ${type}`;
}

// ---------- Order review ----------
function renderCartReview() {
  const cart = getCart();
  const mini = document.getElementById('cartMiniSummary');
  if (!mini) return;

  if (cart.length === 0) {
    mini.innerHTML = '<p class="text-muted">Your cart is empty.</p>';
    return;
  }

  const subtotal = getCartTotal();
  const shipping = subtotal >= 100 ? 0 : 10;
  const total    = subtotal + shipping;

  mini.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:8px;">
      ${cart.map(item => `
        <div class="flex-between" style="font-size:0.85rem;">
          <span>${item.name} × ${item.qty || 1}</span>
          <span style="color:var(--success);">${(parseFloat(item.price||0)*(item.qty||1)).toFixed(2)} KM</span>
        </div>
      `).join('')}
      <hr class="divider">
      <div class="flex-between">
        <span>Shipping</span>
        <span style="color:var(--success);">${shipping === 0 ? 'FREE' : shipping.toFixed(2) + ' KM'}</span>
      </div>
      <div class="flex-between" style="font-family:var(--font-head); font-size:1rem; color:var(--success);">
        <span>Total</span>
        <span>${total.toFixed(2)} KM</span>
      </div>
    </div>
  `;
}

function renderOrderReview() {
  const el = document.getElementById('reviewContent');
  if (!el) return;

  const cart = getCart();
  const subtotal = getCartTotal();
  const shipping = subtotal >= 100 ? 0 : 10;
  const total    = subtotal + shipping;

  el.innerHTML = `
    <div class="glass-panel mb-16">
      <h4 style="font-family:var(--font-head); font-size:0.8rem; color:var(--primary); margin-bottom:16px;">
        <i class="fas fa-user"></i> Customer Info
      </h4>
      <div class="grid-2" style="font-size:0.88rem; gap:8px 16px;">
        <div><span class="text-muted">Name:</span> ${customerData.firstName} ${customerData.lastName}</div>
        <div><span class="text-muted">Email:</span> ${customerData.email}</div>
        <div><span class="text-muted">Address:</span> ${customerData.address}</div>
        <div><span class="text-muted">City:</span> ${customerData.city}</div>
        <div><span class="text-muted">Postal:</span> ${customerData.postalCode}</div>
        <div><span class="text-muted">Country:</span> ${customerData.country}</div>
      </div>
    </div>

    <div class="glass-panel mb-16">
      <h4 style="font-family:var(--font-head); font-size:0.8rem; color:var(--primary); margin-bottom:16px;">
        <i class="fas fa-credit-card"></i> Payment
      </h4>
      <div style="font-size:0.88rem;">
        ${paymentData.type} ending in ****${paymentData.cardNumber?.slice(-4) || '****'} (${paymentData.holder})
      </div>
    </div>

    <div class="glass-panel">
      <h4 style="font-family:var(--font-head); font-size:0.8rem; color:var(--primary); margin-bottom:16px;">
        <i class="fas fa-shopping-bag"></i> Items (${cart.length})
      </h4>
      ${cart.map(item => `
        <div class="flex-between" style="padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05); font-size:0.88rem;">
          <span>${item.name} × ${item.qty || 1}</span>
          <span style="color:var(--success);">${(parseFloat(item.price||0)*(item.qty||1)).toFixed(2)} KM</span>
        </div>
      `).join('')}
      <div class="flex-between mt-16" style="font-family:var(--font-head); font-size:1rem; color:var(--success);">
        <span>Total</span><span>${total.toFixed(2)} KM</span>
      </div>
    </div>
  `;
}

// ---------- Process payment ----------
async function processPayment() {
  const btn = document.getElementById('payNowBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

  const cart = getCart();
  const subtotal = getCartTotal();
  const shipping = subtotal >= 100 ? 0 : 10;
  const total    = subtotal + shipping;

  const payload = {
    items: cart,
    customerInfo: customerData,
    total: total,
  };

  let orderId = 'ORD-' + Date.now().toString(36).toUpperCase();

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (isLoggedIn()) headers['Authorization'] = getToken();

    const res = await fetch(`${API_BASE}/orders/create`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.orderId) orderId = data.orderId;
  } catch (e) {
    // Backend might not be ready; use local orderId
  }

  // Simulate 1.5s processing
  await new Promise(r => setTimeout(r, 1500));

  clearCart();
  showConfirmation(orderId);
}

function showConfirmation(orderId) {
  goToStep(4);
  const el = document.getElementById('confirmOrderId');
  if (el) el.textContent = orderId;
  const emailEl = document.getElementById('confirmEmail');
  if (emailEl) emailEl.textContent = customerData.email || 'your email';
  // Trigger success animation
  const check = document.getElementById('successCheck');
  if (check) check.style.animation = 'none';
  setTimeout(() => { if (check) check.style.animation = ''; }, 50);
}

document.addEventListener('DOMContentLoaded', initCheckout);
