/* ==========================================================================
   Main Application Entrypoint — Ciao Bello Pizzeria
   Imports and initializes all shared and page-specific interactive modules.
   ========================================================================== */

import { initNavigation } from './navigation.js';
import { initUI } from './ui.js';
import { initCart } from './cart.js';
import { initMenu } from './menu.js';
import { initProduct } from './product.js';
import { initCheckout } from './checkout.js';

function bootstrap() {
  try {
    initNavigation();
  } catch (e) {
    console.error('Error initializing navigation:', e);
  }

  try {
    initUI();
  } catch (e) {
    console.error('Error initializing UI:', e);
  }

  try {
    initCart();
  } catch (e) {
    console.error('Error initializing cart:', e);
  }

  try {
    initMenu();
  } catch (e) {
    console.error('Error initializing menu:', e);
  }

  try {
    initProduct();
  } catch (e) {
    console.error('Error initializing product:', e);
  }

  try {
    initCheckout();
  } catch (e) {
    console.error('Error initializing checkout:', e);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
