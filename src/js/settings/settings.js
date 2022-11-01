// responsible for managing user settings

var settings = {
  applyUserSettings: function () {
    settings.applyDarkModePreference();
    settings.applyColorTheme();
  },
  applyDarkModePreference: function () {
    const darkModePreferenceKey = "apply-dark-mode";
    const applyDarkMode = localStorage.getItem(darkModePreferenceKey);

    if (applyDarkMode === "true") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },
  applyColorTheme: function () {
    const colorThemeSettingKey = "color-theme";
    const colorTheme = localStorage.getItem(colorThemeSettingKey);
    const colorThemeDictionary = {
      "default": "#007aff",
      "red": "#ff3b30",
      "green": "#4cd964",
      "blue": "#2196f3",
      "pink": "#ff2d55",
      "yellow": "#ffcc00",
      "orange": "#ff9500",
      "purple": "#9c27b0",
      "deeppurple": "#673ab7",
      "lightblue": "#5ac8fa",
      "teal": "#009688",
      "lime": "#cddc39",
      "deeporange": "#ff6b22",
      "gray": "#8e8e93",
      "black": "#000000",
    };


    if (colorTheme in colorThemeDictionary) {
      document.documentElement.classList.add(`color-theme-${colorTheme}`);

      // set the theme-color meta element for android app
      const metaElement = document.getElementById("android-theme-color");
      metaElement.content = colorThemeDictionary[colorTheme]
    }

  },
};

export default settings;
