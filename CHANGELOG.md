# Changelog

All notable changes to the **ColorZone** project will be documented in this file.

## [1.1.0] - 2026-03-02

### Added
- **Premium Micro-interactions**: Integrated `framer-motion` for smooth, animated transitions between all tabs.
- **PWA Support**: Added `manifest.json` and service worker registration. The app is now fully installable on desktop and mobile.
- **Random Inspiration Tab**: New intelligent color shuffle with history tracking.
- **Color Converter Tab**: Dedicated space for universal format conversion (HEX, RGB, HSL, HSV, CMYK, CSS Names).
- **Color Mixer Tab**: Professional blending studio with weighted sliders and presets.
- **Image Extractor Tab**: Drag-and-drop canvas-based color extraction from images.
- **Gradient Studio**: Upgraded to support Multi-stops, Radial, and Conic gradients with 360° rotation.
- **LCH Perceptual Scaling**: Added uniform brightness scaling mode to the Shade Workspace.
- **Color Blindness Simulator**: Real-time SVG filters for four major types of vision deficiencies.
- **Contrast Auto-Fix**: One-click "Magic Wand" tool to nudge colors into WCAG compliance.

### Changed
- **Rebranded to ColorZone**: Global update of project name, titles, and identity.
- **Tabbed Navigation**: Refactored the entire UI from a single-page scroll to a professional sidebar-based tab system.
- **Improved Footer**: Reworked into a modern multi-column layout with tech stack details and system status.
- **Optimized Performance**: Fixed cascading render anti-patterns in picker and converter components.

### Fixed
- **Linting & Type Safety**: Resolved all "Unexpected any" and "unused variable" errors across the codebase.
- **Component Architecture**: Moved nested components (like `TestRow`) outside of render functions to prevent state reset bugs.
- **Layout Spacing**: Fixed excessive bottom margins and improved sticky navigation positioning.

## [1.0.0] - 2026-03-01

### Added
- Initial release of the Color Picker.
- Basic HEX/RGB/HSL conversion.
- Simple Palette generation.
- LocalStorage persistence for saved colors.
- Basic Accessibility contrast checker.
- Dark/Light mode toggle.

---
*Generated on March 2, 2026*