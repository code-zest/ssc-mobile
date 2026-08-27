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
- **Phase 8: Theming & Global UI Components (Completed)** - Ported the full design system (OKLCH tokens, Inter/JetBrains fonts, UI components) from `ssc-client` to `ssc-mobile` using NativeWind v5. Refactored Dashboard screen to showcase global components.
- **Phase 9: Navigation & Routing (Completed)** - Configured `ssc://` deep linking in Android/iOS native files and React Navigation. Integrated `lucide-react-native` icons and OKLCH color tokens into the Bottom Tab Navigator. Upgraded `RootNavigator` to fetch the auth token from Keychain and bootstrap via `/auth/me` on startup.

## Current Context

- **DX infrastructure complete.** Zero TypeScript errors. Husky pre-commit + pre-push gates active.
- **Theme system integrated.** Custom fonts (`Inter`, `JetBrains Mono`) linked. Core UI components (`Text`, `Button`, `Card`, `Badge`) built and styled via NativeWind v5 with CSS OKLCH tokens.
- Android emulator build running (`Medium_Phone_API_36.0`).
- iOS simulator requires **iOS 18.5 platform** installed via Xcode → Settings → Platforms.
- See [`docs/architecture-and-infrastructure/2026-08-27-setup-and-emulators/setup-and-emulators.md`](../architecture-and-infrastructure/2026-08-27-setup-and-emulators/setup-and-emulators.md) for full setup runbook.
