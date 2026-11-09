/* ==========================================================================
   UI Utilities Module — Ciao Bello Pizzeria
   Handles FAQ accordions, promo code copy, newsletter subscription, and live toasts.
   ========================================================================== */

let toastContainer = null;

export function ensureToastContainer() {
  if (toastContainer && document.body.contains(toastContainer)) return toastContainer;
  toastContainer = document.querySelector('[data-toast-container], .toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.setAttribute('aria-live', 'polite');
    toastContainer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

export function showToast(message) {
  const container = ensureToastContainer();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'opacity 250ms ease, transform 250ms ease';
    setTimeout(() => toast.remove(), 260);
  }, 3200);
}

export function initAccordions() {
  const groups = document.querySelectorAll('[data-accordion-group], [data-faq-accordion], .faq-list');
  groups.forEach((group) => {
    const items = group.querySelectorAll('[data-accordion-item], .faq-row, .faq-item');
    items.forEach((item) => {
      const trigger = item.querySelector('[data-accordion-trigger], .faq-row__header, .faq-trigger');
      const icon = item.querySelector('.faq-row__icon, .faq-trigger__icon');
      if (!trigger) return;

      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        const isOpen = item.classList.contains('is-open');
        if (isOpen) {
          item.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
          if (icon) icon.textContent = '+';
        } else {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          if (icon) icon.textContent = '−';
        }
      });
    });
  });
}

export function initCopyPromo() {
  const buttons = document.querySelectorAll('[data-copy-promo], [data-copy-code], .promo-code-box');
  buttons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const code = btn.getAttribute('data-copy-promo') || btn.getAttribute('data-copy-code') || 'CIAO5';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).catch(() => {});
      }
      const label = btn.querySelector('[data-copy-label], .promo-code-box__action');
      const origText = label ? label.textContent : btn.textContent;
      if (label) {
        label.textContent = 'Copied ✓';
      } else {
        btn.textContent = 'Copied ✓';
      }
      showToast(`Promo code ${code} copied to clipboard!`);
      setTimeout(() => {
        if (label) {
          label.textContent = origText;
        } else {
          btn.textContent = origText;
        }
      }, 2000);
    });
  });
}

export function initNewsletter() {
  const forms = document.querySelectorAll('[data-newsletter-form]');
  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input) return;

      const val = input.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        input.focus();
        showToast('Please enter a valid email address.');
        return;
      }

      input.value = '';
      showToast('Benvenuto! You’re on the list for our latest pizzas and neighborhood updates.');
    });
  });
}

export function initForms() {
  // Catering form handling
  const cateringForm = document.querySelector('[data-catering-form]');
  if (cateringForm) {
    cateringForm.addEventListener('submit', (event) => {
      event.preventDefault();
      showToast('Grazie! We received your catering inquiry and will reply within two business days.');
      cateringForm.reset();
    });
  }

  // Package select helper from package cards
  document.querySelectorAll('[data-select-package]').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const packageName = btn.getAttribute('data-select-package');
      const select = document.querySelector('[data-package-select]');
      if (select && packageName) {
        select.value = packageName;
      }
    });
  });

  // Contact form handling
  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      showToast('Grazie! Your message has been sent to our team.');
      contactForm.reset();
    });
  }

  // Store finder search handling
  const storeSearch = document.querySelector('[data-store-search-form]');
  if (storeSearch) {
    storeSearch.addEventListener('submit', (event) => {
      event.preventDefault();
      showToast('Showing nearest pizzerias for Brooklyn, NY.');
    });
  }

  const useLocBtn = document.querySelector('[data-use-location]');
  if (useLocBtn) {
    useLocBtn.addEventListener('click', (event) => {
      event.preventDefault();
      showToast('Location detected: Carroll Gardens, Brooklyn, NY (0.3 miles away).');
    });
  }

  // Print receipt button
  const printReceiptBtn = document.querySelector('[data-print-receipt]');
  if (printReceiptBtn) {
    printReceiptBtn.addEventListener('click', (event) => {
      event.preventDefault();
      window.print();
    });
  }
}

export function initCurrentYear() {
  const yearNodes = document.querySelectorAll('[data-current-year]');
  const year = new Date().getFullYear() || 2026;
  yearNodes.forEach((node) => {
    node.textContent = String(year);
  });
}

export function initUI() {
  initAccordions();
  initCopyPromo();
  initNewsletter();
  initForms();
  initCurrentYear();
}

if (typeof window !== 'undefined') {
  window.CiaoBelloUI = {
    init: initUI,
    showToast: showToast
  };
}
