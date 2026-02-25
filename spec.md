# Specification

## Summary
**Goal:** Build ETCHLY, a full luxury laser-etched jewelry storefront as a React + Motoko ICP application with a white/gold aesthetic, rich animations, and a customization-focused product experience.

**Planned changes:**

### Theme & Typography
- Apply off-white (#FAFAF8) backgrounds, gold (#C9A84C) accents, deep charcoal (#1A1A1A) text globally
- Load Cormorant Garamond (headings) and Montserrat (UI/body) from Google Fonts

### Animations
- Scroll-reveal fade-in-up (opacity 0 + translateY(30px) → opacity 1 + translateY(0), 0.8s ease-out) on product cards and section blocks
- Subtle parallax on hero/background images (~70% scroll speed)
- Page route transitions: fade to white and back in

### Product Image Interactions
- Hover-magnify: scale 1.5× within container (overflow hidden)
- Click-to-zoom: fullscreen lightbox with close button and Escape key dismissal

### Homepage
- Full-viewport video hero (placeholder video element with dark gradient fallback), bold "ETCHLY" headline, gold "Explore Collection" CTA button
- "How It Works" section: three sequentially animated steps (Upload Photo → Laser Etching → Delivered)
- "Trending Collections" staggered grid with at least 4 mock product cards and staggered fade-in-up
- Footer with grayscale payment icons: VISA, Mastercard, Amex, Discover, JCB, Diners Club, Apple Pay, Google Pay, PayPal, Klarna, Afterpay

### Catalog Page
- Borderless product card grid showing image, name, and price
- Hover swaps to alternate product image
- Staggered scroll-reveal animation

### Product Detail Page (PDP) — Customization Studio
- Split layout: left image gallery with thumbnail strip and zoom support
- Material Hub: four buttons (18K Gold, Rose Gold, 925 Silver, Platinum) that update displayed image and price
- Photo Lab: "Upload Photo" button opens a modal with file input and circular crop preview (simulated, no real AI)
- Live Engraving Preview: text input renders typed text on a 3D pendant/disc using React Three Fiber (cursive font as texture)
- Sticky "Add to Bag" bar fixed at the bottom of the viewport

### 24-Hour Customization Rule Modal
- Clicking "Add to Bag" opens a confirmation modal with the exact copy: "I understand that ETCHLY begins production 24 hours after my order and that customized items cannot be returned."
- Gold "I Agree & Continue" button adds item to cart; "Cancel" link dismisses without adding

### Mini Cart Sidebar
- Slides in from the right when items are added
- Shows item name, selected material, engraved text (if any), and price
- Checkout summary with subtotal, grayscale payment icons, and gold "Proceed to Checkout" button

### Artisan Story (About) Page
- Hero banner with headline "Crafted by Light. Perfected by Hand."
- Three content sections: 2026 laser etching technology, hand-polishing process, quality guarantee
- Large Cormorant Garamond pull-quotes with Montserrat body text
- Scroll-reveal animations

### Order Concierge (Tracking) Page
- Input field for order number submission
- Visual three-stage progress tracker: Designing → Etching → Shipped, with active stage highlighted in gold

### Backend (Motoko)
- `Product` type: id, name, materials (array with label, priceUSD, imageKey), description — pre-populated with 4 products
- `Order` type: id, status (#Designing | #Etching | #Shipped), createdAt — pre-populated with 3 mock orders at different stages
- Exposed queries: `getProducts()` and `getOrderStatus(orderId: Text)`

**User-visible outcome:** Users can browse a luxury jewelry catalog, customize pieces by material and engraving, preview their customization in 3D, add items to a cart (with a mandatory policy agreement), and track mock orders through a visual status tracker — all within a polished white/gold animated storefront.
