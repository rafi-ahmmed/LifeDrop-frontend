const prefix = "/patient";

export const patientRoutes = [
  {
    title: "Management",
    items: [
      { title: "Overview", url: `${prefix}` },
      { title: "Create Campaign", url: `${prefix}/create-campaign` },
      { title: "My Campaigns", url: `${prefix}/my-campaigns` },
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
