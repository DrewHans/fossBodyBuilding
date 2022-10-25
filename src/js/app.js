import $ from "dom7";
import Framework7, { getDevice } from "framework7/bundle";

// Import F7 Styles
import "framework7/css/bundle";

import "../css/icons.css";
import "../css/app.css";

import cordovaApp from "./cordova-app.js";
import routes from "./routes.js";
import store from "./store.js";

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
    },
  },
});
