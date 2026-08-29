# Setup & Running Emulators

**Last Updated:** 2026-08-27

This guide covers the complete local development setup for `ssc-mobile`, including environment prerequisites, Metro bundler, iOS Simulator, and Android Emulator.

---

## Prerequisites

| Tool           | Version                 | Notes                               |
| -------------- | ----------------------- | ----------------------------------- |
| Node.js        | ≥ 22.11.0               | Use nvm: `nvm use`                  |
| Ruby           | ≥ 3.0                   | Required for CocoaPods              |
| Xcode          | ≥ 16 (26.x recommended) | macOS only — install from App Store |
| Android Studio | Latest                  | Includes SDK Manager & AVD Manager  |
| CocoaPods      | Latest                  | `gem install cocoapods`             |
| Watchman       | Latest                  | `brew install watchman`             |

### Android SDK Requirements

The project targets **Android API 37**. Ensure the following are installed via Android Studio's SDK Manager:

- Android SDK Platform 37
- Android SDK Build-Tools 37
- Android Emulator
- Android SDK Platform-Tools

### iOS Runtime Requirements

The project builds against the **iOS 18.5** runtime (installed via Xcode > Settings > Components).

> [!IMPORTANT]
> If you have Xcode 26.x, the default platform is **iOS 26.5**. Install iOS 18.5 via **Xcode → Settings → Platforms** tab to run the simulator.

---

## Initial Setup

### 1. Clone & Install JS Dependencies

```bash
git clone <repo-url>
cd ssc-mobile
npm install
```

### 2. Install iOS CocoaPods

```bash
bundle install          # install CocoaPods gem (first time only)
bundle exec pod install # install native iOS dependencies
```

> Run `bundle exec pod install` again any time you add/update native packages.

### 3. Set Android SDK Path

Create `android/local.properties` pointing to your SDK:

```bash
echo "sdk.dir=$HOME/Library/Android/sdk" > android/local.properties
```

Or set the environment variable (add to `~/.zshrc`):

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools
```

### 4. Run Xcode First Launch (once per machine)

```bash
xcodebuild -runFirstLaunch
```

This initializes Xcode developer tools and prevents plugin-loading errors (exit code 70).

### 5. Set Up Git Hooks (Husky)

Husky is set up automatically on `npm install` via the `prepare` script. To install manually:

```bash
npx husky
```

---

## Running the App

### Step 1 — Start Metro Bundler

Metro must be running before building to either platform:

```bash
npm start              # normal start
npm start -- --reset-cache  # clear cache (use after dependency changes)
```

Metro runs on **http://localhost:8081**.

### Step 2A — iOS Simulator

```bash
npm run ios
```

To target a specific simulator:

```bash
# By name
npx react-native run-ios --simulator "iPhone 16 Pro" --no-packager

# By UDID (recommended — avoids platform version conflicts)
xcrun simctl list devices available   # find UDID
npx react-native run-ios --udid <UDID> --no-packager
```

> [!TIP]
> Use `--no-packager` if Metro is already running to skip the interactive port prompt.

### Step 2B — Android Emulator

First ensure an AVD is running:

```bash
# List available AVDs
~/Library/Android/sdk/emulator/emulator -list-avds

# Start the emulator
~/Library/Android/sdk/emulator/emulator -avd <AVD_NAME> -no-audio -no-boot-anim
```

Then in a separate terminal:

```bash
npm run android
```

Or pass `ANDROID_HOME` inline if not set in shell:

```bash
ANDROID_HOME=$HOME/Library/Android/sdk npx react-native run-android --no-packager
```

---

## Troubleshooting

### Metro port already in use

```bash
# Kill the process on port 8081
lsof -ti :8081 | xargs kill -9
npm start
```

### iOS — xcodebuild exit code 70 (Plugin loading failure)

Xcode plugin frameworks are corrupted or not initialized. Fix:

```bash
xcodebuild -runFirstLaunch
```

If that doesn't fix it, ensure macOS system frameworks are up to date (System Settings → General → Software Update).

### iOS — "iOS 26.5 is not installed"

Xcode 26.x defaults to iOS 26.5. Install the iOS 18.5 runtime:

1. Open **Xcode → Settings (⌘,) → Platforms**
2. Click **+** and download **iOS 18.5**
3. Re-run: `npm run ios`

Alternatively, target iOS 18.5 directly with the UDID approach above.

### Android — SDK location not found

```bash
echo "sdk.dir=$HOME/Library/Android/sdk" > android/local.properties
```

### Android — No emulators found

Open **Android Studio → Device Manager** and create a new Virtual Device (AVD) with API level 36 or higher.

### Android — react-native-worklets not found

```bash
npm install react-native-worklets@0.12.x
```

This is a required peer dependency of `react-native-reanimated` v4.

---

## Git Hooks (Husky)

| Hook         | Trigger      | Action                                                 |
| ------------ | ------------ | ------------------------------------------------------ |
| `pre-commit` | `git commit` | Runs `lint-staged` — ESLint on staged `.ts/.tsx` files |
| `pre-push`   | `git push`   | Runs `tsc --noEmit` — full TypeScript type check       |

To bypass temporarily (not recommended):

```bash
git commit --no-verify
git push --no-verify
```

---

## Available Scripts

| Script      | Command              | Description                                |
| ----------- | -------------------- | ------------------------------------------ |
| Start Metro | `npm start`          | Start dev server on :8081                  |
| iOS         | `npm run ios`        | Build & launch on iOS Simulator            |
| Android     | `npm run android`    | Build & install on Android emulator/device |
| Lint        | `npm run lint`       | ESLint on all source files                 |
| Type Check  | `npm run type-check` | TypeScript type check (no emit)            |
| Test        | `npm test`           | Run Jest unit tests                        |

---

## Environment Variable Management

For managing environment variables (API URLs, keys, etc.) across different environments (dev, staging, prod), we use `react-native-config`.

- **Do not** hardcode environment variables in the codebase.
- **Do not** commit `.env` files to source control (ensure they are in `.gitignore`).
- Define your variables in a `.env` file at the project root for local development.

```bash
# .env example
API_URL=https://api.codezest.dev
```

Access them in code:

```typescript
import Config from 'react-native-config';
const apiUrl = Config.API_URL;
```

---

## Device Lab Management

To ensure consistent testing across the team, adhere to the following device management strategy:

- **Primary iOS Simulator:** iPhone 14 (or latest SE for minimum viewport testing).
- **Primary Android Emulator:** Pixel 7 API 37 (Medium Phone).
- **Physical Device Testing:** Mandatory before any major release. Ensure the app is tested on a low-to-mid range Android device to verify performance and animation smoothness.

---

## CI/CD Pipeline Configuration

Our automated release and testing pipeline uses **GitHub Actions** and **Fastlane**.

### GitHub Actions (Continuous Integration)

On every Pull Request to `main`, the CI pipeline runs:

1. **Linting:** `npm run lint` (ESLint + accessibility audits).
2. **Type Checking:** `npm run type-check` (TypeScript).
3. **Unit Tests:** `npm test` (Jest).

### Fastlane (Continuous Delivery)

Fastlane is used to automate beta distributions and App Store/Play Store releases.

- **iOS:** Fastlane handles certificate management (match), builds the `.ipa`, and uploads to TestFlight.
- **Android:** Fastlane builds the `.aab`, signs it, and uploads to the Google Play Console internal track.

**To run a local release build using Fastlane (requires credentials):**

```bash
# iOS Beta Release
cd ios && bundle exec fastlane beta

# Android Beta Release
cd android && bundle exec fastlane beta
```
