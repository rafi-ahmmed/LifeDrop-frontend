const prefix = "/patient";

export const patientRoutes = [
  {
    title: "Management",
    items: [
      { title: "Overview", url: `${prefix}` },
      { title: "Donor Approval", url: `${prefix}/donor-approval` },
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
