# ColorZone | Advanced Color Studio 🎨

ColorZone is a professional-grade, high-performance color engineering suite built for modern designers and developers. It transforms color selection from a simple task into a precision design workflow.

![Version](https://img.shields.io/badge/version-1.1.0-blue)
![React](https://img.shields.io/badge/React-19-61DAFB)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC)
![PWA](https://img.shields.io/badge/PWA-Ready-orange)

## ✨ Professional Feature Suite

### 🎯 1. Precision Picker
*   **HSV/HSL Controls**: Fine-tuned sliders for Hue, Saturation, Brightness, and Opacity.
*   **Live Identity**: Real-time human-readable color naming (e.g., "Midnight Blue").
*   **Eyedropper**: Native browser tool for picking colors from any screen element.

### 🌓 2. Shade Workspace
*   **Three Scaling Modes**:
    *   **Natural**: Intelligent hue-shifting for organic, non-muddy shadows.
    *   **Perceptual (LCH)**: Perfectly uniform brightness steps using the LCH color space.
    *   **Linear**: Standard mathematical blending.
*   **Custom Steps**: Generate color ramps from 5 to 20 granular steps.
*   **A11y Badges**: Live WCAG contrast ratios displayed on every swatch.

### 🎨 3. Palette Studio
*   **Advanced Harmonies**: Complementary, Triadic, Tetradic, Square, Analogous, and more.
*   **Visual Color Wheel**: Geometric visualization of color relationships.
*   **Mock UI Preview**: See your palette applied to real components (Hero sections, Navbars, Buttons).

### 🌈 4. Gradient Designer
*   **Multi-Stop Support**: Layer up to 5 color stops with precise position control.
*   **Advanced Types**: Linear (360° rotation), Radial (Glow), and Conic (Sweep).
*   **One-Click Sync**: Instantly build gradients around your active primary color.

### 🖼️ 5. Image Extractor
*   **Canvas Extraction**: High-fidelity frequency algorithm to pull dominant palettes from any image.
*   **Drag & Drop**: Seamless browser-only processing (no server uploads, total privacy).

### ⚗️ 6. Intelligent Tools
*   **Color Mixer**: Weighted blending with presets (Complement, Gray, Black/White).
*   **Color Blindness Simulator**: Real-time SVG matrices for Protanopia, Deuteranopia, Tritanopia, and Achromatopsia.
*   **Universal Converter**: Normalize HEX, RGB, HSL, HSV, CMYK, and CSS Names instantly.

### 🎲 7. Inspiration Engine
*   **Smart Shuffle**: Logic-based randomizer that avoids "dead" or extreme colors.
*   **Shuffle History**: Tracks your last 12 inspirations so you never lose a great find.

## 🚀 Advanced Tech Specs

-   **PWA Ready**: Installable on Desktop/Mobile for an offline, app-like experience.
-   **Premium Motion**: Silk-smooth tab transitions powered by **Framer Motion**.
-   **URL State Sync**: Share your exact color setup with a single link via hash-routing.
-   **Dark Mode**: Native, high-contrast dark theme for night-owl designers.

## 🛠️ Installation

1.  **Clone the project**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run Dev**: `npm run dev`
4.  **Build Pro**: `npm run build`

## 🧱 Project Architecture

-   `ColorZone.tsx`: Core HSL/HSV engine.
-   `ShadesGenerator.tsx`: Professional scale workspace.
-   `ImageExtractor.tsx`: Canvas-based pixel analysis.
-   `GradientBuilder.tsx`: Multi-stop CSS generator.
-   `useLocalStorage.ts`: Persistent state management.

---
Built with 💎 for the global design community.
