/* ==========================================================================
   Menu & Store Filter Module — Ciao Bello Pizzeria
   Handles category filter pills on Full Menu and Order Online pages.
   ========================================================================== */

export function initMenuFilters() {
  const filterPills = document.querySelectorAll('[data-menu-filter], [data-order-filter], [data-filter-btn]');
  if (!filterPills.length) return;

  filterPills.forEach((pill) => {
    pill.addEventListener('click', (event) => {
      event.preventDefault();
      const cat = pill.getAttribute('data-menu-filter') || pill.getAttribute('data-order-filter') || pill.getAttribute('data-filter-btn') || 'all';

      // Parent container pills active class
      const container = pill.closest('.filter-pills, .menu-filter-bar');
      if (container) {
        container.querySelectorAll('[data-menu-filter], [data-order-filter], [data-filter-btn]').forEach((p) => {
          p.classList.remove('is-active');
        });
      }
      pill.classList.add('is-active');

      // Filter sections or items
      const sections = document.querySelectorAll('[data-menu-category], [data-filter-category]');
      sections.forEach((section) => {
        const itemCat = section.getAttribute('data-menu-category') || section.getAttribute('data-filter-category');
        if (cat === 'all' || itemCat === cat) {
          section.style.display = '';
        } else {
          section.style.display = 'none';
        }
      });
    });
  });
}

export function initMenu() {
  initMenuFilters();
}

if (typeof window !== 'undefined') {
  window.CiaoBelloMenu = { init: initMenu };
}
