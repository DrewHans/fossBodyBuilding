# Getting Started

This document will guide you on how to setup your system for local development.

---

## Configuring Your System

Install the following software (you're on your own for this part, good luck):
- **git** - https://git-scm.com/downloads
- **java** - https://openjdk.org/
- **node** - https://nodejs.org/en/
- **node package manager** - https://www.npmjs.com/
- **gradle** - https://gradle.org/install/
- **android studio** - https://developer.android.com/studio

Ensure your environment is properly configured (I added this to my .bashrc):
```
# Add Java environment variable
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
# note: update this path if you have java installed somewhere else!

# Add Android environment variables
export ANDROID_SDK_ROOT=~/Android/Sdk
export ANDROID_HOME=~/Android/Sdk
# note: update this path if you have the sdk installed somewhere else!

# Add Android build-tools to path
export PATH=${PATH}:$ANDROID_HOME/build-tools

# Add Android cmdline-tools to path
export PATH=${PATH}:$ANDROID_HOME/cmdline-tools/latest/bin

# Add Android emulator to path
export PATH=${PATH}:$ANDROID_HOME/emulator

# Add Android platform-tools to path
export PATH=${PATH}:$ANDROID_HOME/platform-tools

# Add Android tools to path
export PATH=${PATH}:$ANDROID_HOME/tools

# Add gradle to path
export PATH=$PATH:/opt/gradle/gradle-7.5.1/bin
# note: update this path with your installed version of gradle!
```

---

## Getting The Code Working Locally

**Step 0**. Make sure you have your system properly configured! (See 'Configuring Your System' above)

**Step 1**. Install framework7 & cordova
```
$ npm i framework7-cli cordova -g  # you may need to run this as root
```

**Step 2**. Download the code
```
$ git clone git@github.com:drewhans/fossBodybuilding.git
```

**Step 3**. Open the repo
```
$ cd fossBodybuilding
```

**Step 4**. Install the required node packages
```
$ npm install
```

**Step 5**. Verify that the app runs in your browser
```
$ npm start
```

And now you should be ready to start contributing to development.

---

## Building The Android APK

**Step 0**. Make sure cordova requirements are satisfied
```
$ npm run cordova-requirements

> fossbodybuilding@1.0.0 cordova-requirements
> cd cordova && cordova requirements

Requirements check results for android:
Java JDK: installed 11.0.16
Android SDK: installed true
Android target: installed android-33,android-32,android-30
Gradle: installed /opt/gradle/gradle-7.5.1/bin/gradle
```

If cordova is complaining about something, make sure you fix it before continuing.
Double check 'Configuring Your System' above to make sure your environment is properly setup.

If cordova complains about the 'Android target', then open up Android Studio's SDK Manager and install the platform it recommends.

When you're ready, try running `cordova requirements` again.

**Step 1**. Build the app
```
npm run build
```

Vite may display some warnings. You can ignore those.

**Step 2**. Build the cordova android app
```
npm run build-cordova
```

Again, vite may complain about warnings but you can ignore those. We're building a workout tracker, not a space ship.

You should eventually see something like:
```
BUILD SUCCESSFUL in 1m 5s
48 actionable tasks: 48 executed
Built the following apk(s): 
        /home/nyancat/Code/fossBodybuilding/cordova/platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

**Step 3**. Run the app inside your emulator
```
npm run emulator
```

If you don't have an emulator, then open Android Studio and create one with the device manager.

It might take a few minutes, but evenutally you should see the app load on the emulator.
