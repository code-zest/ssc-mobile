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

## Build Optimization Tips

To maximize build performance in React Native with NativeWind v5:

- **Metro Caching Strategy:** Ensure Metro cache is cleared only when native dependencies or Tailwind configs change (`npm start -- --reset-cache`). Utilize CI caching for `~/.metro` directory.
- **TurboPack Considerations:** NativeWind v5 sets the foundation for future TurboPack compatibility by decoupling from Babel. Ensure you keep `@tailwindcss/postcss` updated.
- **Component Caching:** For complex dynamic styles, memoize the style array using `useMemo` to prevent unnecessary stylesheet recalculations during re-renders.

## Performance Guidelines

When styling a large React Native project:

- **Avoid dynamic template literals:** Write full class names (`bg-primary` instead of `bg-${color}`). NativeWind extracts static classes at build time.
- **Limit string interpolations:** Passing large, dynamic string templates directly into the `className` prop can cause runtime overhead. Use libraries like `clsx` or `tailwind-merge` thoughtfully.
- **Beware of overly complex classes:** Instead of passing 20+ utility classes inline for a deeply nested component, consider using a custom component to encapsulate the styling or extracting it via `@apply` in `global.css` if it's reused heavily across the app.

## TypeScript Configuration

To enable Tailwind CSS IntelliSense class completion in the IDE with NativeWind v5 and Tailwind v4:

1. Ensure the **Tailwind CSS IntelliSense** VSCode extension is installed.
2. In your VSCode `settings.json`, add support for custom regex if you use `cva` or utility functions like `cn`:
   ```json
   "tailwindCSS.experimental.classRegex": [
     ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
     ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
   ]
   ```
3. Create a `env.d.ts` at your project root to declare nativewind module definitions if you encounter type errors with `className` on React Native primitives:
   ```typescript
   /// <reference types="nativewind/types" />
   ```

## Troubleshooting v5 Migration

If you encounter issues during the migration or development:

- **Missing styles after changes:**
  - _Symptom:_ Newly added Tailwind classes do not apply.
  - _Fix:_ Clear the Metro bundler cache (`npm start -- --reset-cache`).
- **Tailwind class does not exist:**
  - _Symptom:_ `Unknown class` warning in logs.
  - _Fix:_ Tailwind v4 drops some legacy v3 classes. Verify the class exists in the Tailwind v4 documentation.
- **Log Analysis Patterns:**
  - Look for PostCSS compilation warnings in the Metro terminal output. NativeWind v5 pushes styling errors to the PostCSS layer rather than Babel.
