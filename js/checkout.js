/* ==========================================================================
   Checkout & Order Module — Ciao Bello Pizzeria
   Handles checkout steps, fulfillment selection, tip selection, and order placement.
   ========================================================================== */

import { loadCart, saveCart, calculateTotals, formatCurrency } from './cart.js';
import { showToast } from './ui.js';

const ORDER_STORAGE_KEY = 'ciao_bello_last_order_v2';

export function initCheckout() {
  const form = document.querySelector('[data-checkout-form]');
  if (!form) return;

  let selectedTipRate = 0;
  let fulfillmentMode = 'pickup';

  // Fulfillment toggles
  const fulfillmentBtns = form.querySelectorAll('[data-fulfillment-mode]');
  fulfillmentBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const mode = btn.getAttribute('data-fulfillment-mode') || 'pickup';
      fulfillmentMode = mode;

      fulfillmentBtns.forEach((b) => {
        const isCurrent = b === btn;
        b.classList.toggle('btn--primary', isCurrent);
        b.classList.toggle('btn--outline', !isCurrent);
        b.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
        const label = b.querySelector('[data-fulfillment-btn-label]');
        if (label) {
          const baseText = b.getAttribute('data-fulfillment-mode') === 'pickup' ? 'Pickup' : 'Delivery';
          label.textContent = isCurrent ? `${baseText} ✓` : baseText;
        }
      });

      const cart = loadCart();
      cart.fulfillment = mode;
      saveCart(cart);
      renderCheckoutSummary();
    });
  });

  // Tip options
  const tipButtons = form.querySelectorAll('[data-tip-amount]');
  tipButtons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      tipButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const rate = parseFloat(btn.getAttribute('data-tip-amount') || '0');
      selectedTipRate = rate;

      const cart = loadCart();
      cart.tipRate = selectedTipRate;
      saveCart(cart);
      renderCheckoutSummary();
    });
  });

  function renderCheckoutSummary() {
    const cart = loadCart();
    cart.tipRate = selectedTipRate;
    const totals = calculateTotals(cart);

    const subtotalEl = form.querySelector('[data-checkout-subtotal]');
    if (subtotalEl) subtotalEl.textContent = formatCurrency(totals.subtotal);

    const discountEl = form.querySelector('[data-checkout-discount]');
    if (discountEl) discountEl.textContent = totals.discount > 0 ? `−${formatCurrency(totals.discount)}` : '$0.00';

    const taxEl = form.querySelector('[data-checkout-tax]');
    if (taxEl) taxEl.textContent = formatCurrency(totals.tax);

    const tipEl = form.querySelector('[data-checkout-tip]');
    if (tipEl) tipEl.textContent = formatCurrency(totals.tip);

    const totalEl = form.querySelector('[data-checkout-total]');
    if (totalEl) totalEl.textContent = formatCurrency(totals.total);

    const submitBtn = form.querySelector('[data-checkout-submit]');
    if (submitBtn) {
      const submitText = submitBtn.querySelector('span');
      if (submitText) {
        submitText.textContent = `Pay ${formatCurrency(totals.total)} and place order`;
      }
    }
  }

  // Initial calculation
  renderCheckoutSummary();

  // Form submit
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const firstName = form.querySelector('input[name="firstName"]')?.value.trim() || 'Alex';
    const lastName = form.querySelector('input[name="lastName"]')?.value.trim() || 'Morgan';
    const email = form.querySelector('input[name="email"]')?.value.trim() || 'alex.morgan@example.com';
    const phone = form.querySelector('input[name="phone"]')?.value.trim() || '(917) 555-0126';

    const cart = loadCart();
    cart.tipRate = selectedTipRate;
    const totals = calculateTotals(cart);

    const orderData = {
      orderId: 'CB-1048',
      name: `${firstName} ${lastName}`,
      email,
      phone,
      fulfillment: fulfillmentMode,
      totals,
      items: cart.items,
      createdAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orderData));
    } catch (e) {}

    showToast('Order confirmed! Redirecting to confirmation…');
    setTimeout(() => {
      window.location.href = 'order-confirmation.html';
    }, 400);
  });
}

export function initOrderConfirmation() {
  const confSection = document.querySelector('.confirmation-intro-section');
  if (!confSection) return;

  try {
    const raw = localStorage.getItem(ORDER_STORAGE_KEY);
    if (raw) {
      const order = JSON.parse(raw);
      const emailEl = document.querySelector('[data-confirmed-email]');
      if (emailEl && order.email) {
        emailEl.textContent = order.email;
      }
    }
  } catch (e) {}
}

if (typeof window !== 'undefined') {
  window.CiaoBelloCheckout = {
    init: () => {
      initCheckout();
      initOrderConfirmation();
    }
  };
}
