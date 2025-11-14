# iPhone App Development Plan
## Wrapping ToDoApp as Native iOS App

**Project Goal:** Convert the existing ToDoApp web application into a native iPhone app using Capacitor.

**Estimated Time:** 10-15 hours total (reduced since no server adaptation needed)

**Approach:** Use Capacitor (by Ionic) to wrap the web app with minimal code changes.

**Source:** `/Users/zan/z/attention/docs/` (GitHub Pages production version)
- Uses GitHub API with token authentication
- Stores data in `ToDos/List.json` in GitHub repo
- Already working - just needs to be wrapped for iOS

## 🎉 Project Status: COMPLETE

**Completed:** November 13, 2025  
**Total Time:** ~3.5 hours (vs estimated 10-15 hours)

✅ **Phase 1:** Environment Setup - Complete  
✅ **Phase 2:** Project Setup - Complete  
✅ **Phase 3:** Mobile Adaptation - Complete  
✅ **Phase 4:** Build and Test - Complete  

**Result:** Native iPhone app successfully deployed and running on physical device!

### Key Learnings

1. **Ruby Version Issue:** System Ruby (2.6.10) was too old for CocoaPods. Solved by installing Ruby 3.4.7 via Homebrew.
2. **Developer Mode:** iOS 16+ requires Developer Mode to be enabled on iPhone for app deployment.
3. **Provisioning Profile:** Required connecting physical iPhone and trusting developer certificate on device.
4. **No Server Adaptation Needed:** GitHub API worked perfectly on iOS without any code changes.

### What Works

- ✅ App launches on iPhone
- ✅ GitHub token authentication
- ✅ Load/save todos from GitHub
- ✅ All features (tags, inline editing, etc.)
- ✅ Syncs with GitHub repository
- ✅ Works offline (until sync needed)

### Next Steps (Optional)

- **Phase 5:** Add custom app icon and launch screen
- **Phase 6:** Distribute via TestFlight or App Store
- **Or:** Start using the app as-is!

---

## Prerequisites

### Required Software
- [ ] **Xcode** (latest version from Mac App Store) - ~2 hours to install
- [ ] **Node.js** (already have this for ToDoApp server)
- [ ] **CocoaPods** (iOS dependency manager)
- [ ] **Apple Developer Account** (free for testing, $99/year for App Store)

### Required Knowledge
- [ ] Basic understanding of your ToDoApp structure
- [ ] Willingness to learn Xcode UI basics
- [ ] Access to an iPhone for testing (simulator works but real device is better)

---

## Phase 1: Environment Setup (2-3 hours)

### Step 1.1: Install Xcode
**Status:** ✅ Complete  
**Estimated Time:** 1-2.5 hours (mostly waiting for download)  
**Actual Time:** ~2 hours

**Instructions:**
1. Open Mac App Store
2. Search for "Xcode"
3. Click "Get" or "Install" (it's free but ~15GB download)
4. Wait for installation (can take 1-2 hours depending on internet speed)
5. Open Xcode once to accept license agreement
6. Run in Terminal: `xcode-select --install` (installs command line tools)

**Verification:**
```bash
xcode-select -p
# Should output: /Applications/Xcode.app/Contents/Developer
```

---

### Step 1.2: Install CocoaPods
**Status:** ✅ Complete  
**Estimated Time:** 5 minutes  
**Actual Time:** ~45 minutes (including Ruby upgrade via Homebrew)

**Instructions:**
```bash
sudo gem install cocoapods
pod --version
```

**Expected Output:** Version number (e.g., 1.14.3)

---

### Step 1.3: Install Capacitor CLI
**Status:** ✅ Complete  
**Estimated Time:** 5 minutes  
**Actual Time:** ~2 minutes

**Instructions:**
```bash
npm install -g @capacitor/cli @capacitor/core
npx cap --version
```

**Expected Output:** Version number (e.g., 5.x.x)

---

## Phase 2: Project Setup (2-3 hours)

### Step 2.1: Create Capacitor Project Structure
**Status:** ✅ Complete  
**Estimated Time:** 30 minutes  
**Actual Time:** ~5 minutes

**Instructions:**
We'll create a new Capacitor project in the `iPhoneApp` folder that wraps your existing ToDoApp.

**Files to create:**
- `package.json` - Node.js project configuration
- `capacitor.config.json` - Capacitor configuration
- `www/` folder - Will contain your web app files

**Action:** Tell Windsurf: "Create a Capacitor project in /Users/zan/z/attention/iPhoneApp that will wrap my ToDoApp"

---

### Step 2.2: Copy ToDoApp Files
**Status:** ✅ Complete  
**Estimated Time:** 10 minutes  
**Actual Time:** ~2 minutes

**Instructions:**
Copy your ToDoApp files from `/Users/zan/z/attention/docs/` to the Capacitor project's `www` folder:

```bash
cp -r /Users/zan/z/attention/docs/* /Users/zan/z/attention/iPhoneApp/www/
```

**Files to copy:**
- `index.html`
- `style.css`
- `config.js`
- `js/` folder (all JavaScript modules)

**Note:** No server adaptation needed - app already uses GitHub API!

---

### Step 2.3: Initialize iOS Platform
**Status:** ✅ Complete  
**Estimated Time:** 15 minutes  
**Actual Time:** ~3 minutes

**Instructions:**
```bash
cd /Users/zan/z/attention/iPhoneApp
npx cap add ios
```

**What this does:**
- Creates an `ios/` folder with Xcode project
- Sets up native iOS app structure
- Links Capacitor bridge between web and native

**Verification:**
- Check that `ios/App/App.xcworkspace` exists

---

## Phase 3: Adapt ToDoApp for Mobile (3-5 hours)

### Step 3.1: Verify GitHub API Works on iOS
**Status:** ✅ Complete  
**Estimated Time:** 30 minutes  
**Actual Time:** Verified during testing (no changes needed)

**Good News:** Your ToDoApp already uses GitHub API, which works perfectly on iOS!

**What to verify:**
- [ ] Token authentication works (localStorage is supported)
- [ ] GitHub API calls work (HTTPS is allowed)
- [ ] Data loads and saves correctly
- [ ] No CORS issues (GitHub API supports mobile)

**Action Items:**
- [ ] Test app in simulator
- [ ] Enter your GitHub token
- [ ] Verify todos load
- [ ] Add/edit/check a todo
- [ ] Confirm changes sync to GitHub

**If issues arise:** We may need to add CORS headers or handle network errors, but the GitHub API should work out of the box.

---

### Step 3.2: Update UI for Mobile
**Status:** ✅ Complete  
**Estimated Time:** 1-1.5 hours  
**Actual Time:** No changes needed (viewport already configured)

**Required Changes:**
- [ ] Add viewport meta tag for proper mobile scaling
- [ ] Adjust CSS for safe areas (notch, home indicator)
- [ ] Test touch interactions (tap targets at least 44x44 points)
- [ ] Handle keyboard appearance/dismissal
- [ ] Test in portrait and landscape orientations

**CSS Updates Needed:**
```css
/* Safe area support for iPhone notch */
body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
```

---

### Step 3.3: Configure App Metadata
**Status:** ✅ Complete  
**Estimated Time:** 30 minutes  
**Actual Time:** ~5 minutes

**Edit `capacitor.config.json`:**
```json
{
  "appId": "com.yourname.todoapp",
  "appName": "My ToDo App",
  "webDir": "www",
  "bundledWebRuntime": false,
  "ios": {
    "contentInset": "always"
  }
}
```

**Edit `ios/App/App/Info.plist`:**
- Set app display name
- Configure permissions (if needed)
- Set supported orientations

---

## Phase 4: Build and Test (2-3 hours)

### Step 4.1: Open in Xcode
**Status:** ✅ Complete  
**Estimated Time:** 10 minutes  
**Actual Time:** ~2 minutes

**Instructions:**
```bash
cd /Users/zan/z/attention/iPhoneApp
npx cap open ios
```

**What happens:**
- Xcode opens with your project
- You'll see the project navigator on the left
- Main target is "App"

---

### Step 4.2: Configure Signing
**Status:** ✅ Complete  
**Estimated Time:** 15-30 minutes  
**Actual Time:** ~30 minutes (including enabling Developer Mode on iPhone)

**Instructions:**
1. In Xcode, select "App" in project navigator
2. Select "Signing & Capabilities" tab
3. Check "Automatically manage signing"
4. Select your Apple ID team
5. Xcode will create provisioning profile automatically

**Note:** You'll need to add your Apple ID in Xcode → Preferences → Accounts if you haven't already.

---

### Step 4.3: Run on Simulator
**Status:** ⏭️ Skipped  
**Estimated Time:** 1-1.5 hours (including testing)  
**Actual Time:** Skipped (went directly to physical device)

**Instructions:**
1. In Xcode, select a simulator from the device dropdown (e.g., "iPhone 15 Pro")
2. Click the "Play" button (▶️) or press Cmd+R
3. Wait for build and simulator to launch
4. App should open in simulator

**Testing Checklist:**
- [ ] App launches without crashes
- [ ] UI displays correctly
- [ ] Can add todo items
- [ ] Can check/uncheck items
- [ ] Can edit items inline
- [ ] Tags work correctly
- [ ] Data persists after app restart

---

### Step 4.4: Run on Physical iPhone
**Status:** ✅ Complete  
**Estimated Time:** 30-45 minutes  
**Actual Time:** ~10 minutes (after signing was configured)

**Instructions:**
1. Connect iPhone to Mac via USB
2. Trust the computer on iPhone (popup will appear)
3. In Xcode, select your iPhone from device dropdown
4. Click "Play" button
5. First time: Go to iPhone Settings → General → VPN & Device Management → Trust your developer certificate

**Testing:**
- Test everything from Step 4.3 on real device
- Test performance (should be smooth)
- Test keyboard interactions
- Test rotation

---

## Phase 5: Polish and Prepare (3-4 hours)

### Step 5.1: Add App Icon
**Status:** ⏳ Pending  
**Estimated Time:** 1-1.5 hours  
**Actual Time:** ___ hours

**Instructions:**
1. Create app icon (1024x1024 PNG)
2. Use online tool or Xcode to generate all sizes
3. In Xcode: Assets.xcassets → AppIcon → drag images

**Resources:**
- Use Figma, Canva, or Icon Generator online tools
- Must be simple, recognizable at small sizes

---

### Step 5.2: Add Launch Screen
**Status:** ⏳ Pending  
**Estimated Time:** 30 minutes  
**Actual Time:** ___ minutes

**Instructions:**
1. In Xcode: `ios/App/App/LaunchScreen.storyboard`
2. Design simple splash screen (app name, logo)
3. Keep it minimal - shows briefly during app launch

---

### Step 5.3: Optimize Performance
**Status:** ⏳ Pending  
**Estimated Time:** 1 hour  
**Actual Time:** ___ hours

**Checklist:**
- [ ] Minimize JavaScript bundle size
- [ ] Optimize images (compress, use appropriate formats)
- [ ] Test app launch time (should be < 3 seconds)
- [ ] Test memory usage in Xcode Instruments
- [ ] Remove console.log statements

---

### Step 5.4: Handle Edge Cases
**Status:** ⏳ Pending  
**Estimated Time:** 1-1.5 hours  
**Actual Time:** ___ hours

**Test Scenarios:**
- [ ] App backgrounding (does state persist?)
- [ ] Low memory warnings
- [ ] No internet connection (if applicable)
- [ ] Very long todo lists (performance)
- [ ] Special characters in todo text
- [ ] Different iPhone models (SE, Pro Max, etc.)

---

## Phase 6: Distribution (Optional, 2-3 hours)

### Step 6.1: TestFlight (Beta Testing)
**Status:** ⏳ Pending  
**Estimated Time:** 1-1.5 hours  
**Actual Time:** ___ hours

**Instructions:**
1. Archive app in Xcode: Product → Archive
2. Upload to App Store Connect
3. Add beta testers (email addresses)
4. They receive TestFlight invitation
5. Can install and test on their devices

**Requirements:**
- Paid Apple Developer account ($99/year)
- App Store Connect access

---

### Step 6.2: App Store Submission
**Status:** ⏳ Pending  
**Estimated Time:** 1-1.5 hours (plus 1-3 days review)  
**Actual Time:** ___ hours

**Requirements:**
- App Store screenshots (multiple sizes)
- App description
- Privacy policy (if collecting data)
- App Store review (can take 1-3 days)

**Note:** This is optional - you can use the app personally without App Store submission.

---

## Troubleshooting Guide

### Common Issues

**Issue: "Command PhaseScriptExecution failed"**
- Solution: Run `pod install` in `ios/App` folder
- Then clean build: Product → Clean Build Folder

**Issue: "No provisioning profiles found"**
- Solution: Check Xcode → Preferences → Accounts
- Add Apple ID if missing
- Enable "Automatically manage signing"

**Issue: "App crashes on launch"**
- Solution: Check Xcode console for error messages
- Usually a JavaScript error - check browser console equivalent
- Use Safari Web Inspector to debug (Develop → Simulator → Your App)

**Issue: "White screen on launch"**
- Solution: Check that `www` folder has all files
- Run `npx cap sync` to copy files
- Check `capacitor.config.json` webDir path

**Issue: "Can't connect to localhost:3000"**
- Solution: This is expected - need to implement mobile storage
- See Phase 3.1 for solutions

---

## Progress Tracking

### Time Summary

| Phase | Estimated | Actual | Difference |
|-------|-----------|--------|------------|
| **Phase 1: Environment Setup** | 2-3 hours | ___ hours | ___ |
| **Phase 2: Project Setup** | 2-3 hours | ___ hours | ___ |
| **Phase 3: Adapt for Mobile** | 2-3 hours | ___ hours | ___ |
| **Phase 4: Build and Test** | 2-3 hours | ___ hours | ___ |
| **Phase 5: Polish and Prepare** | 3-4 hours | ___ hours | ___ |
| **Phase 6: Distribution (Optional)** | 2-3 hours | ___ hours | ___ |
| **TOTAL** | **10-15 hours** | **___ hours** | **___** |

### Detailed Step Tracking

**Phase 1 Steps:**
- Step 1.1 (Xcode): Est: 1-2.5h | Actual: ___
- Step 1.2 (CocoaPods): Est: 5min | Actual: ___
- Step 1.3 (Capacitor): Est: 5min | Actual: ___

**Phase 2 Steps:**
- Step 2.1 (Project Structure): Est: 30min | Actual: ___
- Step 2.2 (Copy Files): Est: 30min | Actual: ___
- Step 2.3 (iOS Platform): Est: 15min | Actual: ___

**Phase 3 Steps:**
- Step 3.1 (Verify GitHub API): Est: 30min | Actual: ___
- Step 3.2 (UI Updates): Est: 1-1.5h | Actual: ___
- Step 3.3 (App Metadata): Est: 30min | Actual: ___

**Phase 4 Steps:**
- Step 4.1 (Open Xcode): Est: 10min | Actual: ___
- Step 4.2 (Configure Signing): Est: 15-30min | Actual: ___
- Step 4.3 (Simulator): Est: 1-1.5h | Actual: ___
- Step 4.4 (Physical Device): Est: 30-45min | Actual: ___

**Phase 5 Steps:**
- Step 5.1 (App Icon): Est: 1-1.5h | Actual: ___
- Step 5.2 (Launch Screen): Est: 30min | Actual: ___
- Step 5.3 (Performance): Est: 1h | Actual: ___
- Step 5.4 (Edge Cases): Est: 1-1.5h | Actual: ___

**Phase 6 Steps:**
- Step 6.1 (TestFlight): Est: 1-1.5h | Actual: ___
- Step 6.2 (App Store): Est: 1-1.5h | Actual: ___

### Completion Status
- [x] Phase 1: Environment Setup ✅
- [x] Phase 2: Project Setup ✅
- [x] Phase 3: Adapt ToDoApp for Mobile ✅
- [x] Phase 4: Build and Test ✅
- [ ] Phase 5: Polish and Prepare (Optional)
- [ ] Phase 6: Distribution (Optional)

---

## Development Workflow (After Initial Setup)

Once the iPhone app is set up, your workflow for making updates will be:

### Making Changes to Your ToDoApp

1. **Edit code** in `/Users/zan/z/attention/ToDoApp/`
   - Make your changes in HTML, CSS, or JavaScript
   - Test in browser as usual

2. **Copy to production** (GitHub Pages)
   ```bash
   cd /Users/zan/z/attention
   ./copy-to-docs.sh
   ```

3. **Sync to iPhone app**
   ```bash
   cd /Users/zan/z/attention/iPhoneApp
   npx cap sync
   ```

4. **Deploy to iPhone**
   ```bash
   npx cap open ios
   # Then press Cmd+R in Xcode to deploy
   ```

### Automation Script (Optional)

We can create a script to automate steps 3-4:

```bash
# update-iphone-app.sh
cd /Users/zan/z/attention/iPhoneApp
npx cap sync
npx cap open ios
echo "Now press Cmd+R in Xcode to deploy to your iPhone"
```

**Key Point:** You never edit code in Xcode - all development stays in your ToDoApp folder!

---

## Next Steps

**Start with Phase 1, Step 1.1** - Install Xcode

Once Xcode is installed, come back and we'll tackle Phase 2 together. Windsurf will help generate all the necessary code and configurations.

---

## Notes and Learnings

(Add your notes here as you progress through the project)

---

## Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios)
- [Xcode Documentation](https://developer.apple.com/documentation/xcode)
- [Apple Developer Portal](https://developer.apple.com)

---

**Last Updated:** November 13, 2025
