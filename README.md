# Mathan M — Personal Portfolio

An ultra-modern, interactive, and high-performance developer portfolio built with semantic **HTML5**, modern **CSS3 animations**, and modular **JavaScript (ES6+)**.

Featured design theme: **Warm Obsidian & Golden Amber** with interactive particle canvas, 3D tilt perspective, live WhatsApp messaging, and responsive micro-interactions.

---

## 🚀 Key Highlights & Animations

- **Hero Design & Real Portrait**: Showcases Mathan's real workspace portrait (`img/mathan-portrait.png`) with ambient backlight aura, interactive 3D perspective mouse tilt, and floating physics-inspired badges (`Available for Hire`, `Clean UI & Speed`, `Full Stack Dev`).
- **Interactive Tech Stack Badges**: Circular glass badges with glowing hover effects and tooltips for Code (`</>`), React (`⚛️`), Python (`🐍`), Django (`dj`), SQL Database (`🗄️`), and GitHub (`🐙`).
- **Background Particle Canvas**: High-performance interactive background canvas with drifting connecting nodes and mouse attraction.
- **Animated Circular Skill Meters**: SVG circular progress meters with dynamic counter numbers that trigger on scroll via Intersection Observer.
- **Filterable Projects Showcase**: Category filters (All, Frontend, E-Commerce, Dashboards) with interactive project deep-dive modal dialogs.
- **Direct WhatsApp Messaging**: Validates visitor inquiries client-side, formats them into a structured WhatsApp message, and launches WhatsApp chat with Mathan (**+91 93840 98304**).
- **Dark / Light Theme Toggle**: Seamless mode switching with persistence in `localStorage`.
- **Circular Progress Back-to-Top**: Circular scroll indicator tracking page scroll percentage.
- **100% Client-Side**: Zero backend dependencies, works on any static host (GitHub Pages, Netlify, Vercel).

---

## 📁 File Structure

```text
portfolio/
├── index.html            # Main semantic HTML5 single-page application
├── style.css             # Root stylesheet (CSS variables, animations, responsive rules)
├── main.js               # Root JavaScript (Particle canvas, tilt, modals, WhatsApp)
├── css/
│   └── style.css         # Mirrored stylesheet for relative path support
├── js/
│   └── main.js           # Mirrored script for relative path support
└── img/
    ├── favicon.svg       # Brand gold hexagon/rounded icon
    ├── mathan-portrait.png # High-resolution portrait of Mathan
    ├── reference-banner.jpg # Reference banner design
    └── Warm Workspace Portrait with Laptop and Plants.png # Original image file
```

---

## 💻 How to Run

Because this project is built entirely with client-side front-end code, no server or backend build step is required:

### Option 1: Direct Browser
Double-click `index.html` or drag and drop it into Chrome, Edge, Firefox, or Safari.

### Option 2: Live Server (VS Code)
1. Open the folder in VS Code.
2. Right-click `index.html` and choose **"Open with Live Server"**.

### Option 3: Local Static Server (Node.js or Python)
```bash
# Python
python -m http.server 3000

# Node.js
npx serve
```

