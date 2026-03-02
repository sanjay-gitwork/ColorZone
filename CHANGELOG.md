# Changelog

All notable changes to the **ColorZone** project will be documented in this file.

## [1.2.0] - 2026-03-02

### Added
- **Modular Architecture**: Decoupled layout components into a dedicated `/layout` directory.
- **Centralized Type System**: Created a unified type registry in `src/types/index.ts`.
- **Strict Type Safety**: Eliminated all `any` types from the codebase, including complex Native API casts.
- **Refined UI Components**: Extracted atomic UI elements like `Toast` into a reusable `/ui` directory.

### Changed
- **Optimized Imports**: Switched to `import type` across the project to comply with `verbatimModuleSyntax`.
- **Clean Orchestrator**: Refactored `App.tsx` to serve as a high-level controller, improving readability and maintainability.

## [1.1.0] - 2026-03-02

### Added
- **Premium Micro-interactions**: Integrated `framer-motion` for smooth, animated tab transitions.
- **PWA Support**: Full manifest and service worker integration for desktop/mobile installability.
- **New Workspaces**: Launched Random Inspiration, Universal Converter, Color Mixer, and Image Extractor tabs.
- **LCH Perceptual Scaling**: Added uniform brightness scaling to the Shade Workspace.
- **Color Blindness Simulator**: Real-time SVG filters for vision deficiency validation.
- **Contrast Auto-Fix**: Added "Magic Wand" tool for instant WCAG compliance.

### Changed
- **Rebranded to ColorZone**: Global identity update.
- **Tabbed Navigation**: Refactored UI from single-page scroll to a professional sidebar-based system.

## [1.0.0] - 2026-03-01

### Added
- Initial release with basic Picker, HEX/RGB conversion, and Saved Colors.

---
*Last Updated: March 2, 2026*