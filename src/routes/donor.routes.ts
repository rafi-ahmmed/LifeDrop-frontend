const prefix = "/donor";

export const donorRoutes = [
  {
    title: "Management",
    items: [
      { title: "Overview", url: `${prefix}` },
      { title: "My Blood Requests", url: `${prefix}/my-blood-requests` },
    ],
  },
  {
    title: "App settings",
    items: [{ title: "Profile", url: `${prefix}/profile` }],
  },
];
