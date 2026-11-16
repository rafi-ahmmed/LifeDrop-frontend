const prefix = "/admin";

export const adminRoutes = [
  {
    title: "Management",
    items: [
      { title: "Overview", url: `${prefix}` },
      { title: "Manage Users", url: `${prefix}/manage-users` },
      { title: "Review Campaign", url: `${prefix}/review-campaign` },
      { title: "Manage Blood Request", url: `${prefix}/manage-blood-request` },
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
