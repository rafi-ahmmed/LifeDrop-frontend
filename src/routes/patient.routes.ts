const prefix = "/patient";

export const patientRoutes = [
  {
    title: "Management",
    items: [
      { title: "Overview", url: `${prefix}` },
      { title: "Create Blood Request", url: `${prefix}/create-blood-request` },
      { title: "My Blood Requests", url: `${prefix}/my-requests` },
      { title: "Create Campaign", url: `${prefix}/create-campaign` },
      { title: "My Campaigns", url: `${prefix}/my-campaigns` },
      { title: "Payment History", url: `${prefix}/payment-history` },
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
