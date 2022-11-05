import AboutPage from "../pages/about/index.f7";

import HomePage from "../pages/home/index.f7";

import NutritionStatsPage from "../pages/home/nutrition-stats.f7";
import TrackFoodItemsPage from "../pages/home/track-food-items.f7";
import TrackBodyPartSizesPage from "../pages/home/track-body-part-sizes.f7";
import TrackBodyWeightPage from "../pages/home/track-body-weight.f7";

import ViewPastWorkoutPage from "../pages/home/view-past-workout.f7";

import FoodLibraryPage from "../pages/food-library/index.f7";
import FoodLibraryCreateFoodPage from "../pages/food-library/create-food-item.f7";
import FoodLibraryCreateMealPage from "../pages/food-library/create-meal-item.f7";
import FoodLibraryEditFoodPage from "../pages/food-library/edit-food-item.f7";
import FoodLibraryEditMealPage from "../pages/food-library/edit-meal-item.f7";

import LiftingLibraryPage from "../pages/lifting-library/index.f7";
import LiftingLibraryCreateExercisePage from "../pages/lifting-library/create-exercise.f7";
import LiftingLibraryCreateWorkoutPage from "../pages/lifting-library/create-workout.f7";
import LiftingLibraryEditExercisePage from "../pages/lifting-library/edit-exercise.f7";
import LiftingLibraryEditWorkoutPage from "../pages/lifting-library/edit-workout.f7";

import SettingsIndexPage from "../pages/settings/index.f7";
import SettingsAppearancePage from "../pages/settings/appearance.f7";
import SettingsDataExportPage from "../pages/settings/data-export.f7";
import SettingsDataImportPage from "../pages/settings/data-import.f7";
import SettingsLanguagePage from "../pages/settings/language.f7";
import SettingsNutrimentsPage from "../pages/settings/nutriments.f7"
import SettingsNutritionIntakeTargetsPage from "../pages/settings/nutrition-intake-targets.f7"
import SettingsPreferredUnitsPage from "../pages/settings/preferred-units.f7";

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
    path: "/foodlibrary/create-food-item/",
    component: FoodLibraryCreateFoodPage,
  },

  {
    path: "/foodlibrary/create-meal-item/",
    component: FoodLibraryCreateMealPage,
  },

  {
    path: "/foodlibrary/edit-food-item/:id",
    component: FoodLibraryEditFoodPage,
  },

  {
    path: "/foodlibrary/edit-meal-item/:id",
    component: FoodLibraryEditMealPage,
  },

  {
    path: "/liftinglibrary/",
    component: LiftingLibraryPage,
  },

  {
    path: "/liftinglibrary/create-exercise/",
    component: LiftingLibraryCreateExercisePage,
  },

  {
    path: "/liftinglibrary/create-workout/",
    component: LiftingLibraryCreateWorkoutPage,
  },

  {
    path: "/liftinglibrary/edit-exercise/:id",
    component: LiftingLibraryEditExercisePage,
  },

  {
    path: "/liftinglibrary/edit-workout/:id",
    component: LiftingLibraryEditWorkoutPage,
  },

  {
    path: "/nutrition-stats/:dateSelected",
    component: NutritionStatsPage,
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
    path: "/settings/data-export/",
    component: SettingsDataExportPage,
  },

  {
    path: "/settings/data-import/",
    component: SettingsDataImportPage,
  },

  {
    path: "/settings/language/",
    component: SettingsLanguagePage,
  },

  {
    path: "/settings/nutriments/",
    component: SettingsNutrimentsPage,
  },

  {
    path: "/settings/nutrition-intake-targets/",
    component: SettingsNutritionIntakeTargetsPage,
  },

  {
    path: "/settings/preferred-units/",
    component: SettingsPreferredUnitsPage,
  },

  {
    path: "/statistics/",
    component: StatisticsPage,
  },

  {
    path: "/track-body-part-sizes/",
    component: TrackBodyPartSizesPage,
  },

  {
    path: "/track-body-weight/",
    component: TrackBodyWeightPage,
  },

  {
    path: "/track-food-items/",
    component: TrackFoodItemsPage,
  },

  {
    path: "/view-past-workout/:id",
    component: ViewPastWorkoutPage
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
