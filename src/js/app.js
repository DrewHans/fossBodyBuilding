import $ from "dom7";
import Framework7, { getDevice } from "framework7/bundle";

// Import F7 Styles
import "framework7/css/bundle";

import "../css/icons.css";
import "../css/app.css";

import cordovaApp from "./cordova-app.js";
import routes from "./routes.js";
import store from "./store.js";

import dbAdapter from "./database/db-adapter.js";
import utils from "./utils/utils.js"
import userSettings from "./settings/settings.js";

import fetchBodyWeightService from "./services/fetch-body-weight";

// Import main app component
import App from "../app.f7";

var device = getDevice();

var app = new Framework7({
  name: "fossBodyBuilding", // App name
  theme: "auto", // Automatic theme detection
  el: "#app", // App root element
  component: App, // App main component
  id: "io.drewhans.fossBodyBuilding", // App bundle ID
  store: store, // App store
  routes: routes, // App routes

  // Input settings
  input: {
    scrollIntoViewOnFocus: device.cordova && !device.electron,
    scrollIntoViewCentered: device.cordova && !device.electron,
  },

  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },

  on: {
    init: function () {
      var f7 = this;

      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }

      // Utils setup
      window.utils = utils;

      // Database setup
      let promiseResult = dbAdapter.initializeDb();
      const onfullfilled = (fullfilledResult) => {
        console.log("Database successfully initialized");
        const dbAdapter = fullfilledResult;

        // save dbAdapter to the javascript window object to make it globally available
        window.dbAdapter = dbAdapter;
      };
      const onrejected = (rejectedResult) => {
        console.error("Failed to initialize database");
        console.error(rejectedResult);
      }
      promiseResult.then(onfullfilled, onrejected);

      // Apply User Settings when app loads
      const deviceSupportsLocalStorage = "localStorage" in window;
      if (deviceSupportsLocalStorage) {
        userSettings.applyUserSettings();

        // save settings to the javascript window object to make it globally available
        window.userSettings = userSettings;
      } else {
        console.warn(
          "Device does not support localStorage; user settings will not be saved."
        );
      }

      // load services
      window.services = {};
      window.services.fetchBodyWeightService = fetchBodyWeightService;
    },
  },
});
