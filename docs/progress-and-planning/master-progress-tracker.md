# Master Progress Tracker (ssc-mobile)

**Status:** Active

This repository (`ssc-mobile`) is a high-performance React Native (CLI) application that serves as the mobile equivalent to the `ssc-client` web application. It consumes the `ssc-api` backend.

## Roadmap

- **Phase 1: Foundation (Completed)** - Scaffolded React Native CLI, configured NativeWind, React Navigation, React Query, Reanimated, FlashList, Axios interceptors.
- **Phase 2: Auth (Completed)** - JWT, secure storage (react-native-keychain), Zustand auth store, Login & Registration UI.
- **Phase 3: Dashboard (Completed)** - Consuming subjects and chapters APIs.
- **Phase 4: Practice Engine (Completed)** - Native quiz UI, Mock tests list.
- **Phase 5: Store (Completed)** - Native gamification store & bottom sheet checkout flow.
- **Phase 6: Infrastructure Upgrade (Completed)** - Upgraded NativeWind v4 → v5 (preview) for Tailwind CSS v4 compatibility. Migrated to CSS-first config (`global.css` with `@import` directives, removed `tailwind.config.js`), removed Babel plugin, added `postcss.config.mjs`.
- **Phase 7: DX & Quality (Completed)** - Fixed all TypeScript errors (added `@tanstack/react-query-persist-client`, CSS module types). Installed `react-native-worklets@0.12.1` (Reanimated v4 peer dep). Set up Husky with `pre-commit` (lint-staged ESLint) and `pre-push` (full `tsc --noEmit`) hooks. Created setup & emulator runbook.

## Current Context

- **DX infrastructure complete.** Zero TypeScript errors. Husky pre-commit + pre-push gates active.
- Android emulator build running (`Medium_Phone_API_36.0`).
- iOS simulator requires **iOS 18.5 platform** installed via Xcode → Settings → Platforms.
- See [`docs/architecture-and-infrastructure/2026-08-27-setup-and-emulators/setup-and-emulators.md`](../architecture-and-infrastructure/2026-08-27-setup-and-emulators/setup-and-emulators.md) for full setup runbook.
