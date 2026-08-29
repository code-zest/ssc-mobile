# Master Progress Tracker (ssc-mobile)

**Status:** Active

This repository (`ssc-mobile`) is a high-performance React Native (CLI) application that serves as the mobile equivalent to the `ssc-client` web application. It consumes the `ssc-api` backend.

## Roadmap & Phase Governance

Every phase must adhere to the following governance model before being marked as "Completed":

- **Owner:** CVS CHARAN (Lead)
- **Exit Criteria:** Specific conditions that must be met (e.g., "zero TS errors", "passes a11y audit").
- **Cross-Platform Consistency:** Must render identically (or within platform bounds) on iOS and Android.
- **Metrics:** Measurable success (e.g., "bundle size < 15MB", "100% component token coverage").
- **Risk Indicators:** Potential blockers identified during the phase.

### Phase 1–9: Initial Port & Setup (Completed)

_See git history for detailed completion records of Foundation, Auth, Dashboard, Practice Engine, Store, Infrastructure Upgrade, DX & Quality, Theming, and Navigation._

### Phase 10: Testing Runbook (Completed)

- **Goal:** Establish a robust testing strategy for mobile.
- **Exit Criteria:** Jest configured for unit tests; Detox configured for E2E testing of the main auth flow.
- **Metrics:** Unit testing configured with React Native Testing Library v14; E2E infrastructure scaffolded.
- **Risks:** Detox environment setup complexity on CI.

### Phase 11: CI/CD Pipeline & Automated Releases (Planned)

- **Goal:** Fully automate releases using GitHub Actions and Fastlane.
- **Exit Criteria:** PRs automatically run tests and linting. Fastlane builds and pushes to TestFlight and Google Play Internal.
- **Metrics:** 0 manual steps required for a beta release.
- **Risks:** iOS Certificate management (match) synchronization.

### Phase 12: Performance & Production Readiness (Planned)

- **Goal:** Ensure the app is optimized for low-end Android devices and network conditions.
- **Exit Criteria:** Implement performance budgets (animations < 600ms), lazy loading for heavy screens.
- **Metrics:** App load time < 2s on mid-range Android.
- **Risks:** React Native re-renders in the practice engine causing dropped frames.

## Current Context

- **DX infrastructure complete.** Zero TypeScript errors. Husky pre-commit + pre-push gates active.
- **Theme system integrated.** Custom fonts (`Inter`, `JetBrains Mono`) linked. Core UI components (`Text`, `Button`, `Card`, `Badge`) built and styled via NativeWind v5 with CSS OKLCH tokens.
- Android emulator build running (`Medium_Phone_API_36.0`).
- iOS simulator requires **iOS 18.5 platform** installed via Xcode → Settings → Platforms.
- See [`docs/architecture-and-infrastructure/2026-08-27-setup-and-emulators/setup-and-emulators.md`](../architecture-and-infrastructure/2026-08-27-setup-and-emulators/setup-and-emulators.md) for full setup runbook.
