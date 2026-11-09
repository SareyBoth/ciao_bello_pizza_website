/* ==========================================================================
   Cart Module — Ciao Bello Pizzeria
   Manages localStorage cart state, calculations, and UI rendering.
   Matches the 1:1 Figma totals ($60 subtotal, -$5 CIAO5, $4.88 tax, $59.88 total).
   ========================================================================== */

const STORAGE_KEY = 'ciao_bello_cart_v2';
const TAX_RATE = 0.08875;

export const PROMO_CODES = {
  CIAO5: { amount: 5.0, label: 'CIAO5 · Welcome discount' },
  NEIGHBOR44: { amount: 8.0, label: 'NEIGHBOR44 · Bundle discount' },
  AMORE49: { amount: 9.0, label: 'AMORE49 · Bundle discount' },
  FAMIGLIA78: { amount: 9.0, label: 'FAMIGLIA78 · Bundle discount' }
};

export function getDefaultCart() {
  return {
    items: [
      {
        id: 'margherita-extra',
        name: 'The Margherita',
        price: 21.0,
        qty: 1,
        meta: '12” · Classic crust · Extra fior di latte +$3',
        image: '../assets/images/pizza-margherita-card.png',
        editable: true
      },
      {
        id: 'hot-honey-amore',
        name: 'Hot Honey, Amore',
        price: 23.0,
        qty: 1,
        meta: '12” · Classic crust · No extras',
        image: '../assets/images/cart-hot-honey-thumb.png',
        editable: true
      },
      {
        id: 'garlic-knots',
        name: 'Garlic knots',
        price: 8.0,
        qty: 1,
        meta: '6 pieces · Marinara on the side',
        image: '../assets/images/cart-garlic-knots-thumb.png',
        editable: false
      },
      {
        id: 'italian-soda',
        name: 'Italian soda',
        price: 4.0,
        qty: 2,
        meta: 'Blood orange · 330 ml · $4 each',
        icon: '../assets/icons/cup-soda.svg',
        editable: false
      }
    ],
    promoCode: 'CIAO5',
    fulfillment: 'pickup',
    pickupTime: 'Today, 7:00–7:15 pm',
    tipRate: 0,
    kitchenNote: 'Extra napkins and chili oil on the side please.'
  };
}

export function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultCart();
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items) || parsed.items.length === 0) {
      return getDefaultCart();
    }
    return parsed;
  } catch (e) {
    return getDefaultCart();
  }
}

export function saveCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    // Ignore storage quota
  }
}

export function calculateTotals(cart) {
  const itemCount = cart.items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const promo = cart.promoCode && PROMO_CODES[cart.promoCode] ? PROMO_CODES[cart.promoCode] : null;
  const discount = subtotal > 0 && promo ? Math.min(promo.amount, subtotal) : 0;
  const discountedSubtotal = Math.max(0, subtotal - discount);
  const deliveryFee = cart.fulfillment === 'delivery' && subtotal > 0 ? 3.99 : 0;
  const tax = Number((discountedSubtotal * TAX_RATE).toFixed(2));
  const tip = Number((subtotal * (cart.tipRate || 0)).toFixed(2));
  const total = Number((discountedSubtotal + deliveryFee + tax + tip).toFixed(2));

  return {
    itemCount,
    subtotal,
    discount,
    discountLabel: promo ? promo.label : 'Welcome discount',
    discountedSubtotal,
    deliveryFee,
    tax,
    tip,
    total
  };
}

export function formatCurrency(val) {
  return '$' + Number(val).toFixed(2);
}

export function updateGlobalCartBadges(cart) {
  const totals = calculateTotals(cart);
  document.querySelectorAll('[data-cart-count]').forEach((el) => {
    el.textContent = String(totals.itemCount);
  });
}

export function renderCartPage(cart) {
  const container = document.querySelector('[data-cart-items-container]');
  const totals = calculateTotals(cart);

  // Update item count badge
  const itemsLabel = document.querySelector('[data-cart-items-label]');
  if (itemsLabel) {
    itemsLabel.textContent = `${totals.itemCount} items`;
  }

  // Update summary fields if on cart page
  const subtotalEl = document.querySelector('[data-summary-subtotal]');
  if (subtotalEl) subtotalEl.textContent = formatCurrency(totals.subtotal);

  const discountEl = document.querySelector('[data-summary-discount]');
  if (discountEl) discountEl.textContent = totals.discount > 0 ? `−${formatCurrency(totals.discount)}` : '$0.00';

  const taxEl = document.querySelector('[data-summary-tax]');
  if (taxEl) taxEl.textContent = formatCurrency(totals.tax);

  const totalEl = document.querySelector('[data-summary-total]');
  if (totalEl) totalEl.textContent = formatCurrency(totals.total);

  const deliveryRow = document.querySelector('[data-summary-delivery]');
  if (deliveryRow) {
    deliveryRow.textContent = totals.deliveryFee > 0 ? formatCurrency(totals.deliveryFee) : 'Free';
  }

  // If container exists and items need re-render
  if (container && cart.items.length === 0) {
    container.innerHTML = `
      <div style="padding: 48px; text-align: center; background-color: var(--color-parchment); border-radius: var(--radius-card);">
        <h3 style="font-family: var(--font-display); font-size: 28px; color: var(--color-tomato); margin-bottom: 12px;">Your table is empty</h3>
        <p style="font-family: var(--font-sans); color: var(--color-taupe); margin-bottom: 24px;">Add a hand-stretched sourdough pie or garlic knots to get started.</p>
        <a href="menu.html" class="btn btn--primary">Browse menu ↗</a>
      </div>
    `;
  }
}

export function addItem(itemData) {
  const cart = loadCart();
  const existing = cart.items.find((i) => i.id === itemData.id);
  if (existing) {
    existing.qty += itemData.qty || 1;
  } else {
    cart.items.push({
      id: itemData.id || 'item-' + Date.now(),
      name: itemData.name,
      price: Number(itemData.price) || 20,
      qty: itemData.qty || 1,
      meta: itemData.meta || '12” · Classic crust',
      image: itemData.image || '../assets/images/pizza-margherita-card.png',
      editable: Boolean(itemData.editable)
    });
  }
  saveCart(cart);
  updateGlobalCartBadges(cart);
  renderCartPage(cart);

  if (window.CiaoBelloUI && window.CiaoBelloUI.showToast) {
    window.CiaoBelloUI.showToast(`Added ${itemData.name} to your cart!`);
  }
}

export function initCart() {
  const cart = loadCart();
  updateGlobalCartBadges(cart);
  renderCartPage(cart);

  // Global click delegator
  document.addEventListener('click', (event) => {
    // Add to cart buttons
    const addBtn = event.target.closest('[data-add-to-cart]');
    if (addBtn) {
      event.preventDefault();
      addItem({
        id: addBtn.getAttribute('data-id') || 'pie-' + Date.now(),
        name: addBtn.getAttribute('data-name') || 'Handmade Pizza',
        price: parseFloat(addBtn.getAttribute('data-price') || '21'),
        qty: 1,
        meta: addBtn.getAttribute('data-meta') || '12” · Classic crust',
        image: addBtn.getAttribute('data-image') || '../assets/images/pizza-margherita-card.png',
        editable: true
      });
      return;
    }

    // Deal buttons
    const dealBtn = event.target.closest('[data-order-deal]');
    if (dealBtn) {
      event.preventDefault();
      const code = dealBtn.getAttribute('data-order-deal');
      const c = loadCart();
      c.promoCode = code;
      saveCart(c);
      window.location.href = 'order-online.html';
      return;
    }

    // Increment
    const incBtn = event.target.closest('[data-cart-qty-inc], [data-cart-inc]');
    if (incBtn) {
      event.preventDefault();
      const id = incBtn.getAttribute('data-cart-qty-inc') || incBtn.getAttribute('data-cart-inc');
      const c = loadCart();
      const item = c.items.find((i) => i.id === id);
      if (item) {
        item.qty += 1;
        saveCart(c);
        updateGlobalCartBadges(c);
        renderCartPage(c);
        const row = incBtn.closest('.cart-item-row');
        if (row) {
          const val = row.querySelector('.qty-control__val, .qty-stepper__val');
          if (val) val.textContent = String(item.qty);
          const price = row.querySelector('.cart-item-row__price');
          if (price) price.textContent = formatCurrency(item.price * item.qty);
        }
      }
      return;
    }

    // Decrement
    const decBtn = event.target.closest('[data-cart-qty-dec], [data-cart-dec]');
    if (decBtn) {
      event.preventDefault();
      const id = decBtn.getAttribute('data-cart-qty-dec') || decBtn.getAttribute('data-cart-dec');
      const c = loadCart();
      const item = c.items.find((i) => i.id === id);
      if (item) {
        if (item.qty > 1) {
          item.qty -= 1;
          saveCart(c);
          updateGlobalCartBadges(c);
          renderCartPage(c);
          const row = decBtn.closest('.cart-item-row');
          if (row) {
            const val = row.querySelector('.qty-control__val, .qty-stepper__val');
            if (val) val.textContent = String(item.qty);
            const price = row.querySelector('.cart-item-row__price');
            if (price) price.textContent = formatCurrency(item.price * item.qty);
          }
        } else {
          c.items = c.items.filter((i) => i.id !== id);
          saveCart(c);
          updateGlobalCartBadges(c);
          const row = decBtn.closest('.cart-item-row');
          if (row) row.remove();
          renderCartPage(c);
        }
      }
      return;
    }

    // Remove
    const removeBtn = event.target.closest('[data-cart-remove]');
    if (removeBtn) {
      event.preventDefault();
      const id = removeBtn.getAttribute('data-cart-remove');
      const c = loadCart();
      c.items = c.items.filter((i) => i.id !== id);
      saveCart(c);
      updateGlobalCartBadges(c);
      const row = removeBtn.closest('.cart-item-row');
      if (row) row.remove();
      renderCartPage(c);
      if (window.CiaoBelloUI && window.CiaoBelloUI.showToast) {
        window.CiaoBelloUI.showToast('Item removed from cart.');
      }
      return;
    }
  });

  // Promo code form handling
  const promoForm = document.querySelector('[data-promo-form]');
  if (promoForm) {
    promoForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = promoForm.querySelector('[data-promo-input]');
      const label = promoForm.querySelector('[data-promo-btn-label]');
      if (!input) return;

      const code = input.value.trim().toUpperCase();
      const c = loadCart();
      if (PROMO_CODES[code]) {
        c.promoCode = code;
        saveCart(c);
        renderCartPage(c);
        if (label) label.textContent = 'Applied ✓';
        if (window.CiaoBelloUI && window.CiaoBelloUI.showToast) {
          window.CiaoBelloUI.showToast(`Code ${code} applied: $${PROMO_CODES[code].amount} off!`);
        }
      } else {
        if (window.CiaoBelloUI && window.CiaoBelloUI.showToast) {
          window.CiaoBelloUI.showToast('Invalid promo code. Try CIAO5 for $5 off.');
        }
      }
    });
  }
}

if (typeof window !== 'undefined') {
  window.CiaoBelloCart = {
    init: initCart,
    loadCart: loadCart,
    saveCart: saveCart,
    calculateTotals: calculateTotals,
    addItem: addItem
  };
}
