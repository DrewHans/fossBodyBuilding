// responsible for managing user settings

var settings = {
  applyUserSettings: function () {
    settings.applyDarkModePreference();
    settings.setColorTheme();
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
  setColorTheme: function () {
    const colorThemeSettingKey = "color-theme";
    const colorTheme = localStorage.getItem(colorThemeSettingKey);
    const availableColorThemes = [
      "red",
      "green",
      "blue",
      "pink",
      "yellow",
      "orange",
      "purple",
      "deeppurple",
      "lightblue",
      "teal",
      "lime",
      "deeporange",
      "gray",
      "white",
      "black",
    ];

    if (availableColorThemes.includes(colorTheme)) {
      document.documentElement.classList.add(`color-theme-${colorTheme}`);
    }

  },
};

export default settings;
