/* ==========================================================================
   Navigation Module — Ciao Bello Pizzeria
   Handles mobile drawer open/close, backdrop, Escape key, scroll lock, and focus trap.
   ========================================================================== */

export function initNavigation() {
  const toggleBtn = document.querySelector('[data-mobile-menu-toggle], [data-menu-open], .mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer') || document.querySelector('[data-menu-drawer]');
  const backdrop = document.querySelector('[data-mobile-drawer-backdrop], [data-menu-backdrop], .mobile-drawer__backdrop');
  const closeBtn = document.querySelector('[data-mobile-menu-close], [data-menu-close], .mobile-drawer__close');

  if (!toggleBtn || !drawer) return;

  const focusableSelector =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function openDrawer() {
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    if (backdrop) {
      backdrop.classList.add('is-open');
      backdrop.setAttribute('aria-hidden', 'false');
    }
    document.body.classList.add('nav-open');

    const firstFocusable = drawer.querySelector(focusableSelector);
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 50);
    }
  }

  function closeDrawer(returnFocus = true) {
    if (!drawer.classList.contains('is-open')) return;
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    if (backdrop) {
      backdrop.classList.remove('is-open');
      backdrop.setAttribute('aria-hidden', 'true');
    }
    document.body.classList.remove('nav-open');

    if (returnFocus) {
      toggleBtn.focus();
    }
  }

  toggleBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (event) => {
      event.preventDefault();
      closeDrawer(true);
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => closeDrawer(false));
  }

  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeDrawer(false));
  });

  document.addEventListener('keydown', (event) => {
    if (!drawer.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeDrawer(true);
      return;
    }

    if (event.key === 'Tab') {
      const focusables = Array.from(drawer.querySelectorAll(focusableSelector));
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}

if (typeof window !== 'undefined') {
  window.CiaoBelloNav = { init: initNavigation };
}
