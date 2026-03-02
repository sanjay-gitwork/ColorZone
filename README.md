# ColorZone | Advanced Color Engineering Studio 🎨

ColorZone is a professional-grade, high-performance color engineering suite built for modern designers and developers. It transforms color selection from a simple task into a precision design workflow using an enterprise-grade modular architecture.

![Version](https://img.shields.io/badge/version-1.3.0-blue)
![React](https://img.shields.io/badge/React-19-61DAFB)
![Architecture](https://img.shields.io/badge/Architecture-FSD_Atomic-green)
![PWA](https://img.shields.io/badge/PWA-Ready-orange)

## ✨ Professional Feature Suite

### 🎯 1. Precision Picker
*   **HSV/HSL Controls**: Fine-tuned sliders for Hue, Saturation, Brightness, and Opacity.
*   **Live Identity**: Real-time human-readable color naming (e.g., "Midnight Blue").

### 🌓 2. Shade Workspace
*   **LCH Perceptual Scaling**: Perfectly uniform brightness steps using the LCH color space.
*   **Natural Mode**: Intelligent hue-shifting for organic UI shadows.
*   **Custom Steps**: Generate granular color ramps from 5 to 20 steps.

### 🎨 3. Palette Studio
*   **Advanced Harmonies**: Complementary, Triadic, Tetradic, Square, and more.
*   **Visual Color Wheel**: Geometric visualization of color relationships.
*   **Mock UI Preview**: See your palette applied to real components instantly.

### 🌈 4. Gradient Designer
*   **Multi-Stop Powerhouse**: Layer up to 5 color stops with precise position control.
*   **Sweep & Glow**: Support for Linear, Radial (Glow), and Conic (Sweep) gradients.

### 🖼️ 5. Image Extractor
*   **Canvas Extraction**: High-fidelity pixel analysis to pull dominant palettes.
*   **Privacy-First**: 100% browser-side processing; no images are ever uploaded.

## 🏗️ Scalable Architecture (FSD + Atomic)

The project follows a highly scalable, logic-decoupled architecture designed for large-scale production:

-   **`/src/features`**: Grouped by feature (Shades, Gradients, etc.). Each contains its own `components` and `hooks` (Logic-UI separation).
-   **`/src/components/ui/base`**: Fundamental UI building blocks (Buttons, Cards, CopyButtons).
-   **`/src/components/ui/shared`**: Reusable complex patterns (Swatches, Sliders).
-   **`/src/config`**: Centralized Design System constants (animations, theme, radii).
-   **`/src/hooks`**: Feature-specific custom hooks that encapsulate all mathematical logic.

## 🚀 Advanced Tech Specs

-   **Logic Decoupling**: 100% of mathematical logic is moved into custom hooks, keeping components purely visual.
-   **PWA Ready**: Fully installable on Desktop/Mobile for an offline experience.
-   **Premium Motion**: Physics-based tab transitions powered by **Framer Motion**.
-   **Strict TypeScript**: Zero-any policy with type-only imports for maximum reliability.

## 🛠️ Installation

1.  **Clone & Install**: `npm install`
2.  **Run Dev**: `npm run dev`
3.  **Build Pro**: `npm run build`

---
Built with 💎 for the global design community.
