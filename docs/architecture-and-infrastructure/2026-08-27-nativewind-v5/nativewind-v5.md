# NativeWind v5 & Tailwind CSS v4 — Architecture

**Date:** 2026-08-27
**Status:** Active

## Overview

This project uses **NativeWind v5** (with Tailwind CSS v4) for utility-first styling in React Native. NativeWind translates Tailwind class names into React Native `StyleSheet` objects at build time via the Metro bundler.

## Package Versions

| Package                | Version           | Role                          |
| ---------------------- | ----------------- | ----------------------------- |
| `nativewind`           | `5.0.0-preview.4` | Tailwind-to-RN transform      |
| `tailwindcss`          | `^4.3.3`          | CSS utility framework         |
| `react-native-css`     | `^3.0.7`          | Native CSS runtime            |
| `@tailwindcss/postcss` | `latest`          | PostCSS integration for TW v4 |

## Architecture: How It Works

```
global.css  →  PostCSS (@tailwindcss/postcss)  →  Metro (withNativeWind)  →  StyleSheet objects
```

1. **`global.css`** — The CSS entry point. Uses Tailwind v4 CSS-first imports (`@import "tailwindcss/..."`) instead of the old `@tailwind` directives.
2. **`postcss.config.mjs`** — Configures PostCSS to use `@tailwindcss/postcss`. This processes `global.css` during the Metro build.
3. **`metro.config.js`** — Wraps the Metro config with `withNativeWind(config)`. This hooks into the Metro transform pipeline.
4. **`babel.config.js`** — Standard RN Babel preset + Reanimated plugin only. NativeWind v5 **no longer requires a Babel plugin**.

## Key Differences from NativeWind v4

| Feature        | v4                                                  | v5                                   |
| -------------- | --------------------------------------------------- | ------------------------------------ |
| Tailwind CSS   | v3 only                                             | v4+ required                         |
| Babel plugin   | Required (`nativewind/babel`)                       | **Removed**                          |
| CSS config     | `tailwind.config.js`                                | CSS-first (`@theme` in `global.css`) |
| Metro call     | `withNativeWind(config, { input: './global.css' })` | `withNativeWind(config)`             |
| CSS directives | `@tailwind base/components/utilities`               | `@import "tailwindcss/..."`          |

## Adding Custom Theme Tokens

In v5, custom theme configuration lives in `global.css` using `@theme` blocks (not `tailwind.config.js`):

```css
/* global.css */
@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/preflight.css' layer(base);
@import 'tailwindcss/utilities.css';
@import 'nativewind/theme';

@theme {
  --color-primary: #6366f1;
  --font-size-xl: 1.25rem;
}
```

## Files Changed in This Upgrade

| File                 | Change                                         |
| -------------------- | ---------------------------------------------- |
| `global.css`         | Replaced `@tailwind` directives with `@import` |
| `babel.config.js`    | Removed `nativewind/babel` plugin              |
| `metro.config.js`    | Removed `{ input: './global.css' }` argument   |
| `postcss.config.mjs` | **New** — PostCSS config for Tailwind v4       |
| `tailwind.config.js` | **Deleted** — replaced by CSS-first config     |
