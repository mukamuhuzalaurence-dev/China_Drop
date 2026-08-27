# 📱 Publishing China Drop to App Store & Google Play Store

Your China Drop project is fully configured with **Capacitor** and **Automated Cloud Workflows** to generate native packages for both Apple App Store and Google Play Store.

---

## 1. 🤖 Google Play Store (Android)

### Package Format
- **`.apk`** (Direct install on Android phones)
- **`.aab`** (Android App Bundle for Google Play Console submission)

### How to Get Your File:
1. **GitHub Automated Cloud Build (Easiest)**:
   - Push this codebase to GitHub repository.
   - Go to your repository **Actions** tab.
   - The workflow `Build App Store & Play Store Packages` automatically runs and outputs `ChinaDrop-Android-PlayStore.zip` containing `app-debug.apk` and `app-release.apk` ready to install or upload to Google Play Console!

2. **Local Android Studio Build**:
   ```bash
   npm run build
   npx cap add android
   npx cap open android
   ```
   - In Android Studio, select **Build → Generate Signed Bundle / APK**.

---

## 2. 🍎 Apple App Store (iOS - iPhone)

### Package Format
- **`.ipa`** / **`App.xcarchive`** (Apple App Store & TestFlight package)

### How to Get Your File:
1. **GitHub Automated Cloud Build (Easiest)**:
   - Push this codebase to GitHub repository.
   - Go to your repository **Actions** tab.
   - The workflow automatically runs on a macOS runner and generates `ChinaDrop-iOS-AppStore.zip`!

2. **Local Mac / Xcode Build**:
   ```bash
   npm run build
   npx cap add ios
   npx cap open ios
   ```
   - In Xcode, select **Product → Archive → Distribute App → App Store Connect**.

---

## 3. 📲 Instant iPhone Web App (PWA)

You can also install China Drop directly on any iPhone right now without App Store approval:

1. Deploy your website link (e.g., via Vercel, Netlify, or your server).
2. Open the link in **Safari** on any iPhone.
3. Tap the **Share** button (bottom bar icon with arrow pointing up).
4. Tap **"Add to Home Screen"**.
5. China Drop installs on the iPhone home screen with the 🐼 Panda icon and launches full screen just like an App Store app!
