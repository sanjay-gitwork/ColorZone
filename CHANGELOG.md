# Changelog

All notable changes to the **ColorZone** project will be documented in this file.

## [1.3.0] - 2026-03-02

### Added
- **Enterprise-Grade Architecture**: Implemented a hybrid of **Feature-Sliced Design (FSD)** and **Atomic Design**.
- **Logic-UI Decoupling**: Moved 100% of mathematical and state logic into feature-specific custom hooks (e.g., `useShades`, `useGradients`).
- **Unified Base Library**: Created a foundational UI library in `/src/components/ui/base` for consistent styling.
- **Shared UI Library**: Created a reusable component library in `/src/components/ui/shared` for common design patterns.
- **Design System Config**: Centralized design constants (animations, theme colors, borders) in `src/config/design-system.ts`.

### Changed
- **Folder Simplification**: Created **"base"** and **"shared"** folder for clearer developer onboarding.
- **Refined Feature Folders**: Moved all business logic into `/src/features`, ensuring high cohesion and low coupling.
- **Improved Performance**: Optimized rendering paths by ensuring visual components are logic-free.

## [1.2.0] - 2026-03-02

### Added
- **Modular Architecture**: Decoupled layout components (Header, Sidebar, Footer).
- **Centralized Type System**: Created a unified type registry in `src/types/index.ts`.
- **Strict Type Safety**: Eliminated all `any` types from the codebase.

### Changed
- **Optimized Imports**: Switched to type-only imports for `verbatimModuleSyntax` compliance.

## [1.1.0] - 2026-03-02

### Added
- **Premium Micro-interactions**: Integrated `framer-motion` transitions.
- **PWA Support**: Full manifest and service worker integration.
- **New Workspace Tabs**: Launched Random, Converter, Mixer, and Image Extractor.
- **LCH Perceptual Scaling**: Professional brightness scaling mode.

## [1.0.0] - 2026-03-01

### Added
- Initial release with core Picker and Palette functionality.

---
*Last Updated: March 2, 2026*