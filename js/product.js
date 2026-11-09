/* ==========================================================================
   Product Customizer Module — Ciao Bello Pizzeria
   Handles size, crust, extra toppings, quantity, live price, and add-to-order.
   ========================================================================== */

import { addItem } from './cart.js';

export function initProduct() {
  const root = document.querySelector('[data-product-customizer]');
  if (!root) return;

  const basePrice = parseFloat(root.getAttribute('data-base-price') || '18');
  const productName = root.getAttribute('data-product-name') || 'The Margherita';

  const crustOptions = root.querySelectorAll('[data-crust-option]');
  const extraOptions = root.querySelectorAll('[data-extra-option]');
  const qtyDecBtn = root.querySelector('[data-product-qty-dec]');
  const qtyIncBtn = root.querySelector('[data-product-qty-inc]');
  const qtyValEl = root.querySelector('[data-product-qty-val]');
  const addBtn = root.querySelector('[data-product-add-btn]');
  const btnLabel = root.querySelector('[data-product-btn-label]');
  const breakdownLabel = root.querySelector('[data-product-breakdown-label]');
  const breakdownPrice = root.querySelector('[data-product-breakdown-price]');

  let quantity = 1;

  function calculate() {
    let crustPrice = 0;
    let crustLabel = 'Classic 48h';
    crustOptions.forEach((btn) => {
      if (btn.classList.contains('is-selected')) {
        crustPrice = parseFloat(btn.getAttribute('data-price') || '0');
        crustLabel = btn.getAttribute('data-label') || 'Classic crust';
      }
    });

    let extrasPrice = 0;
    const selectedExtras = [];
    extraOptions.forEach((btn) => {
      if (btn.classList.contains('is-selected')) {
        extrasPrice += parseFloat(btn.getAttribute('data-price') || '0');
        selectedExtras.push(btn.getAttribute('data-label') || 'Extra');
      }
    });

    const unitPrice = basePrice + crustPrice + extrasPrice;
    const totalPrice = unitPrice * quantity;

    if (qtyValEl) qtyValEl.textContent = String(quantity);

    const extraStr = selectedExtras.length > 0 ? ' + ' + selectedExtras.join(' + ') : '';
    if (breakdownLabel) {
      breakdownLabel.textContent = `${productName}${extraStr}`;
    }
    if (breakdownPrice) {
      breakdownPrice.textContent = `$${unitPrice.toFixed(2)}`;
    }
    if (btnLabel) {
      btnLabel.textContent = `Add to order · $${totalPrice.toFixed(2)}`;
    }

    return {
      unitPrice,
      totalPrice,
      crustLabel,
      selectedExtras,
      extraStr
    };
  }

  // Crust selection (single select)
  crustOptions.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      crustOptions.forEach((b) => {
        b.classList.remove('is-selected');
        b.setAttribute('aria-pressed', 'false');
        const ind = b.querySelector('.option-row-btn__indicator');
        if (ind) ind.textContent = '○';
      });
      btn.classList.add('is-selected');
      btn.setAttribute('aria-pressed', 'true');
      const ind = btn.querySelector('.option-row-btn__indicator');
      if (ind) ind.textContent = '◉';
      calculate();
    });
  });

  // Extras selection (multi select)
  extraOptions.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const isSelected = btn.classList.toggle('is-selected');
      btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      const ind = btn.querySelector('.option-row-btn__indicator');
      if (ind) ind.textContent = isSelected ? '◉' : '○';
      calculate();
    });
  });

  // Quantity controls
  if (qtyDecBtn) {
    qtyDecBtn.addEventListener('click', (event) => {
      event.preventDefault();
      if (quantity > 1) {
        quantity -= 1;
        calculate();
      }
    });
  }

  if (qtyIncBtn) {
    qtyIncBtn.addEventListener('click', (event) => {
      event.preventDefault();
      quantity += 1;
      calculate();
    });
  }

  // Add to order button
  if (addBtn) {
    addBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const state = calculate();
      addItem({
        id: 'margherita-custom-' + Date.now(),
        name: productName,
        price: state.unitPrice,
        qty: quantity,
        meta: `12” · ${state.crustLabel}${state.extraStr ? ' · ' + state.selectedExtras.join(', ') : ''}`,
        image: '../assets/images/pizza-margherita-hero.png',
        editable: true
      });
    });
  }

  calculate();
}

if (typeof window !== 'undefined') {
  window.CiaoBelloProduct = { init: initProduct };
}
