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
    items: [
      { title: "Routing", url: "#" },
      { title: "Data Fetching", url: "#" },
      { title: "Rendering", url: "#" },
    ],
  },
];
