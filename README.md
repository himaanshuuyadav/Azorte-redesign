# AZORTE Redesign

A premium redesign concept inspired by AZORTE's fashion retail experience, featuring immersive storytelling, interactive retail experiences, smooth animations, and a modern responsive design.

---

## Live Demo

**[View Live Website](https://your-vercel-deployment-link-here.vercel.app)**

*Note: Replace the placeholder link above with your live Vercel deployment URL.*

---

## Preview

### Homepage
![Homepage](screenshots/homepage.png)

### Manifesto Section
![Manifesto](screenshots/manifesto.png)

### Collections
![Collections](screenshots/collections.png)

### NeoStore Experience
![NeoStore](screenshots/neostore.png)

### Store Locator
![Store Locator](screenshots/store-locator.png)

---

## Highlights

* Premium editorial-inspired design language
* Interactive manifesto storytelling with scroll-locked transitions
* GSAP-powered high-performance scroll animations
* NeoStore retail technology and self-checkout showcase
* Interactive India store locator mapping system
* Fluid, mobile-first responsive architecture
* Custom premium launch loading experience
* Optimized Next.js 14+ static architecture

---

## Tech Stack

This project is built with modern, production-ready frontend technologies:

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Animations:** GSAP & @gsap/react
* **Smooth Scroll:** Lenis
* **Icons:** Lucide React
* **Deployment:** Vercel

---

## Features

### Hero Experience
A cinematic entrance featuring a full-bleed autoplaying video, layered gradient overlays for enhanced typography legibility, and a custom launch loader that prevents layout shifts while the critical video assets decode.

### Manifesto Storytelling
An interactive, scroll-locked storytelling experience. As users scroll, GSAP precisely orchestrates the transition between fashion pillars, perfectly synchronizing background typography scales and foreground imagery with zero frame latency or flickering.

### Collections Showcase
A dynamic, horizontally scrolling product gallery. Utilizing modern CSS scroll snapping and Tailwind grids, it presents high-resolution editorial photography in a clean, magazine-like layout that feels native on both mobile and desktop.

### NeoStore Experience
A feature showcase of AZORTE's technological retail innovations. Interactive accordion interfaces allow users to explore concepts like Smart Fitting Rooms and Mobile Self-Checkout without leaving the page context.

### Store Discovery System
A custom SVG-based mapping experience of India. The locator features an interactive state-based list, real-time map highlighting, and mobile-optimized touch targets that seamlessly hand off to Google Maps for precise directions.

### Responsive Design
A strictly mobile-first approach. Every breakpoint from 320px up to ultra-wide 1920px displays is explicitly handled. The architecture ensures 44px minimum touch targets, fluid typography, and dynamic safe-area overflow containment.

### Performance Optimizations
Images are aggressively optimized utilizing the Next.js `<Image>` component with AVIF/WEBP formats and preloaded GPU-decoded bitmaps. The architecture avoids runtime hydration mismatches by strictly constraining all GSAP calculations to client boundaries.

---

## Project Structure

```text
azorte/
├── app/
│   ├── layout.tsx         # Root layout, global SEO, and Lenis provider
│   └── page.tsx           # Main landing page aggregation
├── components/
│   ├── layout/            # Navbar, Footer, and global scaffolding
│   ├── sections/          # Modular page sections (Hero, Manifesto, etc.)
│   └── ui/                # Reusable UI primitives (Container, Map, etc.)
├── data/                  # Static constants, store locations, external links
├── hooks/                 # Custom React hooks (useLenis, useReducedMotion)
├── lib/                   # Utility functions (Tailwind merge, link builders)
├── public/                # Static assets (fonts, images, videos, SVGs)
└── styles/                # Global CSS and Tailwind directives
```

---

## Local Development

1. Clone the repository and navigate into the project directory:
   ```bash
   git clone https://github.com/your-username/azorte-redesign.git
   cd azorte-redesign
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build

To test the highly-optimized production build locally:

```bash
npm run build
npm start
```

---

## Lighthouse & Quality

This project treats quality metrics as a primary engineering requirement:

* **Responsive Design:** Fully fluid interfaces supporting the widest spectrum of modern devices without horizontal clipping.
* **Accessibility:** Built with semantic HTML, precise ARIA labels for decorative elements, and accessible focus states for keyboard navigation.
* **SEO:** Comprehensive OpenGraph tags, semantic headers, and static HTML prerendering.
* **Performance:** Hardware-accelerated CSS animations and heavily optimized asset loading to protect Core Web Vitals.

---

## Design Philosophy

The objective was to create a digital experience that mirrors the feeling of walking into a premium retail space. Rather than a standard e-commerce grid, the design prioritizes high-fidelity storytelling and fashion-first aesthetics. 

Spacing is intentionally generous, allowing typography and editorial photography to breathe. Micro-interactions are subtle but deliberate, guiding the user through the brand's narrative from the cinematic hero to the final store locator. It represents what a modern retail experience should feel like—effortless, confident, and highly refined.

---

## Future Improvements

While feature-complete, future roadmap items include:

* Additional dynamic store data integration via an external CMS.
* Enhanced retail experience videos (e.g., in-store walkthroughs).
* Continuous performance auditing for new browser engines.
* Richer, seasonal campaign content drops.

---

## Author

**Himanshu Yadav**  
[GitHub Profile](https://github.com/himaanshuuyadav)
