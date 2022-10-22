# Getting Started with Framework7 & Cordova

This document will guide you on how to create your own project.

---

## Configuring Your System

Install the following software (you're on your own for this part, good luck):
- **git** - https://git-scm.com/downloads
- **java** - https://openjdk.org/
- **node** - https://nodejs.org/en/
- **node package manager** - https://www.npmjs.com/

Ensure your environment is properly configured for your target platform(s).
See "how-to-start-developing.md" for how I configured my system for Android development.

---

## Getting Your Project Set Up

**Step 1**. Install framework7 & cordova
```
$ npm i framework7-cli cordova -g  # you may need to run this as root
```

**Step 2**. Create your project
```
$ mkdir MyAwesomeProject
$ cd MyAwesomeProject
$ framework7 create --ui  # be sure to select cordova during setup
```

**Step 3**. Install the required node packages
```
$ npm install
```

**Step 4**. Verify setup was successful by running the dev server
```
$ npm start
```

And now you should be ready to start working on your own project.

Feel free to reference my other doc, "how-to-start-developing.md" to see how I set up fossBodyBuilding for Android.

---
