// {
//     title: "Management",
//     items: [
//       { title: "Overview", url: `${prefix}` },
//       { title: "Donor Approval", url: `${prefix}/donor-approval` },
//     ],
//   },
//   {
//     title: "App settings",
//     url: "#",
//     items: [
//       { title: "Routing", url: "#" },
//       { title: "Data Fetching", url: "#", isActive: true },
//       { title: "Rendering", url: "#" },
//     ],
//   },

interface SidebarItem {
  title: string;
  url: string;
}

interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

export type SidebarItems = SidebarGroup[];
