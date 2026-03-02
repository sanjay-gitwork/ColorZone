# ColorZone | Advanced Color Engineering Studio 🎨

ColorZone is a professional-grade, high-performance color engineering suite built for modern designers and developers. It transforms color selection from a simple task into a precision design workflow.

![Version](https://img.shields.io/badge/version-1.2.0-blue)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC)
![PWA](https://img.shields.io/badge/PWA-Ready-orange)

## ✨ Professional Feature Suite

### 🎯 1. Precision Picker
*   **HSV/HSL Controls**: Fine-tuned sliders for Hue, Saturation, Brightness, and Opacity.
*   **Live Identity**: Real-time human-readable color naming (e.g., "Midnight Blue").
*   **Eyedropper**: Native browser tool for picking colors from any screen element.

### 🌓 2. Shade Workspace
*   **Three Scaling Modes**: Natural (Hue-shifting), Perceptual (LCH), and Linear.
*   **Custom Steps**: Generate color ramps from 5 to 20 granular steps.
*   **A11y Badges**: Live WCAG contrast ratios displayed on every swatch.

### 🎨 3. Palette Studio
*   **Advanced Harmonies**: Complementary, Triadic, Tetradic, Square, Analogous, and more.
*   **Visual Color Wheel**: Geometric visualization of color relationships.
*   **Mock UI Preview**: See your palette applied to real components (Hero sections, Navbars).

### 🌈 4. Gradient Designer
*   **Multi-Stop Support**: Layer up to 5 color stops with precise position control.
*   **Advanced Types**: Linear (360° rotation), Radial (Glow), and Conic (Sweep).

### 🖼️ 5. Image Extractor
*   **Canvas Extraction**: High-fidelity frequency algorithm to pull dominant palettes.
*   **Privacy-First**: 100% browser-side processing; no images are ever uploaded.

### ⚗️ 6. Intelligent Tools & Converter
*   **Color Mixer**: Weighted blending with professional presets.
*   **A11y Suite**: Real-time **Color Blindness Simulation** and **Contrast Auto-Fix**.
*   **Universal Converter**: Normalize HEX, RGB, HSL, HSV, CMYK, and CSS Names instantly.

## 🏗️ Modular Architecture

The project follows a highly scalable, component-based architecture:
-   **`/src/components/layout`**: Decoupled UI structure (Header, Sidebar, Footer).
-   **`/src/components/ui`**: Reusable atomic components (Toast, Modals).
-   **`/src/types`**: Centralized Type System for 100% type safety.
-   **`/src/utils`**: Pure mathematical logic for color conversions and LCH scaling.

## 🚀 Advanced Tech Specs

-   **Zero-Any Policy**: 100% TypeScript coverage with strict type-only imports.
-   **PWA Ready**: Fully installable on Desktop/Mobile for an offline experience.
-   **Premium Motion**: Silk-smooth tab transitions powered by **Framer Motion**.
-   **Optimized Rendering**: Zero cascading renders; optimized with `useMemo` and `useCallback`.

## 🛠️ Installation

1.  **Clone & Install**:
    ```bash
    git clone https://github.com/yourusername/colorzone.git
    npm install
    ```
2.  **Run Dev**: `npm run dev`
3.  **Build Pro**: `npm run build`

---
Built with 💎 for the global design community.
