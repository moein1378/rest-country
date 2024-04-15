export const routes = [
  {
    path: "/",
    redirect: { name: "home-page" },
    children: [
      {
        path: "/home",
        name: "home-page",
        component: () => import("@pages/home-page.vue"),
      },
      {
        path: "country-info/:countryName",
        name: "country-info",
        component: () => import("@pages/country-info.vue"),
      },
    ],
  },
];
