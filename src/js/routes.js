import AboutPage from "../pages/about/index.f7";
import HomePage from "../pages/home/index.f7";
import FoodLibraryPage from "../pages/food-library/index.f7";
import LiftingLibraryPage from "../pages/lifting-library/index.f7";
import SavedWorkoutsPage from "../pages/saved-workouts/index.f7";
import SettingsIndexPage from "../pages/settings/index.f7";
import SettingsAppearancePage from "../pages/settings/appearance.f7";
import SettingsMeasurementUnitsPage from "../pages/settings/measurement-units.f7";
import StatisticsPage from "../pages/statistics/index.f7";

import NotFoundPage from "../pages/404.f7";

import DynamicRoutePage from "../pages/dynamic-route.f7";
import RequestAndLoad from "../pages/request-and-load.f7";

var routes = [
  {
    path: "/",
    component: HomePage,
  },

  {
    path: "/about/",
    component: AboutPage,
  },

  {
    path: "/foodlibrary/",
    component: FoodLibraryPage,
  },

  {
    path: "/liftinglibrary/",
    component: LiftingLibraryPage,
  },

  {
    path: "/savedworkouts/",
    component: SavedWorkoutsPage,
  },

  {
    path: "/settings/",
    component: SettingsIndexPage,
  },

  {
    path: "/settings/appearance/",
    component: SettingsAppearancePage,
  },

  {
    path: "/settings/measurement-units/",
    component: SettingsMeasurementUnitsPage,
  },

  {
    path: "/statistics/",
    component: StatisticsPage,
  },

  {
    path: "/dynamic-route/blog/:blogId/post/:postId/",
    component: DynamicRoutePage,
  },
  {
    path: "/request-and-load/user/:userId/",
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // get user data using params
      var userId = to.params.userId;

      // TODO: fetch request goes here

      var user = {
        firstName: "Vladimir",
        lastName: "Kharlampidi",
        about: "Hello, i am creator of Framework7! Hope you like it!",
        links: [
          {
            title: "Framework7 Website",
            url: "http://framework7.io",
          },
          {
            title: "Framework7 Forum",
            url: "http://forum.framework7.io",
          },
        ],
      };

      // Hide Preloader
      app.preloader.hide();

      // Resolve route to load page
      resolve(
        {
          component: RequestAndLoad,
        },
        {
          props: {
            user: user,
          },
        }
      );
    },
  },
  {
    path: "(.*)",
    component: NotFoundPage,
  },
];

export default routes;
