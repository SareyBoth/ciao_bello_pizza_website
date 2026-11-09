# Ciao Bello Pizzeria — Multi-Screen Static Website

Production-quality, responsive multi-screen website implementation of **Ciao Bello Pizzeria** built with semantic HTML5, modern CSS3 custom properties, and modular vanilla JavaScript (ES6+).

- **Figma Source of Truth**: [Pizza Website — Ciao Bello Pizzeria](https://www.figma.com/design/EXJfxi1zEtQE0YHajt40q6/Pizza-Website?node-id=0-1&p=f&t=9dl0mREtCdYixYai-0) (`EXJfxi1zEtQE0YHajt40q6`, Page 1 `0:1`)
- **Tech Stack**: Semantic HTML5, CSS3 (Custom Properties, Grid, Flexbox, Fluid Typography), Vanilla JavaScript (ES6+, `localStorage` persistence). Zero external frameworks or build steps required.

---

## 1. Implemented Screens & HTML Routes (All 13 Figma Frames)

| # | Figma Frame Name | Node ID | Frame Size | HTML File | Description |
|---|---|---|---|---|---|
| 1 | `Ciao Bello pizzeria` | `8:3197` | `1440 × 6166` | `index.html` | Main landing page: hero with rotating seal, house favorites, 72-hour craft story, full menu preview with category filters, guest reviews, 3 NYC kitchens, and newsletter signup. |
| 2 | `Ciao Bello · Full menu` | `11:24037` | `1440 × 3550` | `pages/menu.html` | Complete menu directory: category filter bar, dietary legend, Chef's Table featured trio, and 5 full menu sections (Red Pies, White Pies, Roman Squares, Antipasti & Salads, Dolci & Drinks). |
| 3 | `Ciao Bello · The Margherita` | `11:24317` | `1440 × 2376` | `pages/product-detail.html` | Dish customization screen: hero photo with provenance cards, interactive size selector (`12"` / `16"`), crust radio selector, extra toppings checkboxes, quantity stepper, and pairing quick-adds. |
| 4 | `Ciao Bello · Order online` | `11:24450` | `1440 × 2681` | `pages/order-online.html` | Direct online ordering hub: Pickup/Delivery fulfillment bar, live cart pill, Most Ordered Tonight quick-add cards, and full categorized order rows. |
| 5 | `Ciao Bello · Your cart` | `11:24642` | `1440 × 2301` | `pages/cart.html` | Shopping cart workspace: fulfillment mode banner, line items with quantity steppers & remove controls, kitchen notes, 1-tap upsells, promo code (`CIAO5`) form, and live order summary sidebar. |
| 6 | `Ciao Bello · Checkout` | `11:24819` | `1440 × 2586` | `pages/checkout.html` | Two-column encrypted checkout: Step 1 Fulfillment & timing, Step 2 Pickup contact form, Step 3 Crew tip selector (`No tip`, `10%`, `15%`, `20%`, `Other`) & payment method (`Card` vs `Apple Pay`), and live order summary. |
| 7 | `Ciao Bello · Our stores` | `11:25025` | `1440 × 3006` | `pages/stores.html` | Store directory & finder: reservations notice card, interactive store search & selector with illustrated NYC neighborhood map, Carroll Gardens flagship showcase, and Williamsburg / West Village cards. |
| 8 | `Ciao Bello · Carroll Gardens` | `11:25261` | `1440 × 3298` | `pages/carroll-gardens.html` | Flagship store detail page: Court Street hero with live wait status, 4 ways to enjoy, 3 Court Street oven exclusives, and illustrated local map with subway & delivery boundary guide. |
| 9 | `Ciao Bello · Offers` | `11:25505` | `1440 × 3231` | `pages/deals.html` | Table bundles & perks: `CIAO5` welcome code card with 1-click copy, The Friday Night Table hero bundle, 3 curated feasts, weekly neighborhood rituals, and interactive FAQ accordion. |
| 10 | `Ciao Bello · Our story` | `11:25751` | `1440 × 4018` | `pages/about.html` | Brand story & provenance: founders Luca & Mia Ferraro hero, Day 1–3 72-hour sourdough ritual, 4 regional purveyor cards, founder quote, and 2018–2024 milestone timeline. |
| 11 | `Ciao Bello · Catering` | `11:25956` | `1440 × 3574` | `pages/catering.html` | Catering & private events: catering hero, 3 turnkey headcount packages (`$220`, `$420`, `$790`), à la carte catering trays, private dining spaces, and interactive catering quote form. |
| 12 | `Ciao Bello · Contact` | `11:26134` | `1440 × 2525` | `pages/contact.html` | Hospitality & support: interactive topic pill selector and contact form, direct oven phone directory, department email inboxes, hiring banner, and FAQ accordion. |
| 13 | `Ciao Bello · Order confirmation` | `11:26273` | `1440 × 2617` | `pages/order-confirmation.html` | Post-checkout confirmation (`#CB-4829`): confirmed banner with pickup window card, 4-step live kitchen tracker, pickup guide, kitchen ticket note, and itemized printable receipt. |

---

## 2. Project Structure

```text
pizza-website/
├── index.html
├── pages/
│   ├── menu.html
│   ├── product-detail.html
│   ├── order-online.html
│   ├── cart.html
│   ├── checkout.html
│   ├── stores.html
│   ├── carroll-gardens.html
│   ├── deals.html
│   ├── about.html
│   ├── catering.html
│   ├── contact.html
│   └── order-confirmation.html
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── responsive.css
│   └── pages/
│       ├── home.css
│       ├── menu.css
│       ├── product-detail.css
│       ├── order-online.css
│       ├── cart.css
│       ├── checkout.css
│       ├── stores.css
│       ├── carroll-gardens.css
│       ├── deals.css
│       ├── about.css
│       ├── catering.css
│       ├── contact.css
│       └── order-confirmation.css
├── js/
│   ├── main.js
│   ├── navigation.js
│   ├── ui.js
│   ├── menu.js
│   ├── product.js
│   ├── cart.js
│   └── checkout.js
├── assets/
│   ├── fonts/
│   │   ├── fraunces-normal.woff2
│   │   ├── fraunces-italic.woff2
│   │   └── inter-normal.woff2
│   ├── icons/
│   │   ├── bike.svg
│   │   ├── bike-cream.svg
│   │   ├── check-cream.svg
│   │   ├── cup-soda.svg
│   │   ├── lock-keyhole.svg
│   │   ├── mail.svg
│   │   ├── neighborhood-map.svg
│   │   ├── phone.svg
│   │   ├── shopping-bag.svg
│   │   ├── shopping-bag-cream.svg
│   │   ├── street-network.svg
│   │   ├── users.svg
│   │   ├── utensils.svg
│   │   └── utensils-cream.svg
│   ├── images/
│   │   ├── cart-garlic-knots-thumb.png
│   │   ├── cart-hot-honey-thumb.png
│   │   ├── catering-table-spread.png
│   │   ├── craft-pizza-maker.png
│   │   ├── menu-funghi-town.png
│   │   ├── menu-hot-honey-amore.png
│   │   ├── neighborhood-pizzeria-interior.png
│   │   ├── offers-welcome-pie.png
│   │   ├── order-funghi-town.png
│   │   ├── order-hot-honey-amore.png
│   │   ├── pairing-garlic-knots.png
│   │   ├── pairing-house-tiramisu.png
│   │   ├── pizza-funghi-town-card.png
│   │   ├── pizza-hot-honey-card.png
│   │   ├── pizza-margherita-card.png
│   │   ├── pizza-margherita-hero.png
│   │   └── story-luca-and-mia.png
│   └── logos/
│       ├── ciao-bello-wordmark.svg
│       └── slow-proofed-seal.svg
└── README.md
```

---

## 3. How to Run Locally

Because the project uses standard relative paths and zero build steps, you can serve it with any local static HTTP server:

```bash
# Option 1: Using Python 3
python -m http.server 8080

# Option 2: Using Node.js npx serve
npx serve -l 8080 .
```

Then open `http://localhost:8080` in your browser.

---

## 4. Responsive Behavior & Breakpoints

- **Desktop Reference (`1440px` & `1920px`)**: Exact pixel-aligned columns, `72px` horizontal section padding (`1296px` inner container), and full desktop header navigation.
- **Laptop (`1280px` & `1024px`)**: Proportional fluid two-column splits with zero horizontal overflow. At `<= 1120px`, navigation transitions to an accessible slide-over mobile/tablet drawer.
- **Tablet & Mobile (`768px`, `430px`, `375px`, `320px`)**: Multi-column card grids reflow cleanly from `4/3` columns to `2` columns (`<= 1120px`) and `1` column (`<= 768px`). Display headings scale smoothly via `clamp()`, and all interactive controls maintain touch-friendly sizing.

---

## 5. Interactive Features

- **Mobile Navigation Drawer (`js/navigation.js`)**: Accessible slide-over menu with `aria-expanded`, `Escape` key close, backdrop click close, body scroll lock, and keyboard focus trapping.
- **Category Filter Pills (`js/menu.js`)**: Instant filtering of menu sections on `index.html`, `pages/menu.html`, and `pages/order-online.html`.
- **Store Finder (`js/menu.js`)**: Live text filtering by neighborhood/ZIP/subway line, interactive store card selection synced with map pins, and smooth scroll to store details on `pages/stores.html`.
- **Pizza Customizer (`js/product.js`)**: Live calculation of size (`12"` vs `16"`), crust (`Classic`, `Sesame`, `Gluten-Free`), extra toppings checkboxes, and quantity stepper on `pages/product-detail.html`.
- **Persistent Cart (`js/cart.js`)**: `localStorage`-backed cart pre-loaded with the exact Figma line items, supporting item additions across all pages, quantity steppers, item removal, Pickup/Delivery fee toggling, and promo code validation (`CIAO5`).
- **Checkout & Order Confirmation (`js/checkout.js`)**: Dynamic crew tip calculations (`No tip`, `10%`, `15%`, `20%`, `Other`), payment method toggle (`Card` vs `Apple Pay`), inline form validation, and live hydration of `pages/order-confirmation.html` plus printable receipt support.
- **Accordions & Utilities (`js/ui.js`)**: Accessible FAQ accordions on `pages/deals.html` and `pages/contact.html`, 1-click promo code clipboard copy, newsletter signup, and live toast notifications.

---

## 6. Fonts & Assets Notes

- **Typography**: Both **Fraunces** (variable optical display serif, normal & italic) and **Inter** (variable sans-serif) are stored locally as `.woff2` files in `assets/fonts/` and loaded via `@font-face` in `css/variables.css`.
- **Assets**: All 17 raster photographs (`assets/images/*.png`) and 16 vector icons/seals/maps/wordmarks (`assets/icons/*.svg`, `assets/logos/*.svg`) were exported directly from their original Figma nodes.
#   c i a o _ b e l l o _ p i z z a _ w e b s i t e  
 