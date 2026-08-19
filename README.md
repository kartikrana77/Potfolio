<div align="center">
  <img src="https://raw.githubusercontent.com/kartikrana77/Rimberio/main/public/vite.svg" width="80" alt="Vite Logo" />
  <h1 align="center">Kartik Rana — Cinematic Portfolio</h1>
  
  <p align="center">
    A hyper-premium, Awwwards-inspired personal portfolio featuring a buttery-smooth 148-frame GSAP canvas scroll sequence, interactive glassmorphism, and robust performance optimizations.
  </p>

  <p align="center">
    <a href="#features"><strong>✨ Features</strong></a> ·
    <a href="#tech-stack"><strong>💻 Tech Stack</strong></a> ·
    <a href="#installation"><strong>🚀 Installation</strong></a> ·
    <a href="#optimization"><strong>⚡ Optimization</strong></a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  </p>
</div>

---

## ✨ Features

- **Cinematic Scrollytelling:** A high-performance `<canvas>` element preloads 148 ultra-high-definition frames, mapping playback precisely to the user's scroll progress using GSAP ScrollTrigger.
- **Glassmorphism Bento Box UI:** Modern, translucent grid layouts showcasing skills, experience, and certifications.
- **Interactive Circuit Cursor:** A custom `framer-motion` powered cursor that acts as a magnifying glass, revealing a hidden cybernetic circuit board beneath the website surface.
- **Buttery Smooth Scrolling:** Integrated with `@studio-freight/lenis` for an ultra-premium, zero-stutter scrolling experience standard on top-tier design websites.
- **Responsive & Optimized:** Lazy-loaded React components, dynamic chunk-splitting, aggressive CSS/JS minification, and robust touch-device support for flawless mobile usage.
- **SEO & Security Ready:** Full Open Graph, Twitter Cards, JSON-LD Schema markup, and HTTP Security Headers (`vercel.json` & `_headers`).

---

## 💻 Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS + Vanilla CSS (`index.css` for custom scrollbars & glass components)
- **Animations:** GSAP (ScrollTrigger), Framer Motion
- **Smooth Scroll:** React Lenis
- **State Management:** Redux Toolkit (for global loading state & scroll progress)
- **Icons:** Lucide React

---

## 🚀 Installation & Setup

This project uses entirely static assets and public APIs. **No `.env` file or private environment variables are required.**

### 1. Clone the repository
```bash
git clone https://github.com/kartikrana77/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```
The optimized bundle will be generated in the `dist` directory.

---

## ⚡ Performance Optimizations

This project was built with a heavy focus on maintaining 60fps across all devices:
1. **Dynamic Canvas Rendering:** GSAP updates canvas frames strictly on `requestAnimationFrame` tied to scroll progress.
2. **Component Lazy Loading:** All below-the-fold components (`BentoSection`, `ProjectsSection`, `CertificationsSection`, `Footer`) are loaded asynchronously via `React.lazy()` and `Suspense`.
3. **Manual Chunk Splitting:** Vite is configured to split heavy animation libraries (`framer-motion`, `gsap`) into distinct vendor chunks to maximize browser caching.

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/kartikrana77">Kartik Rana</a></p>
  <p>© 2026 Kartik Rana — All rights reserved.</p>
</div>
