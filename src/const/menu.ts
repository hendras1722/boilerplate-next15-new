import { MenuItem } from "@/components/AppSidebar";

export const DATA_MANAGEMENT_MENU: MenuItem[] = [
  {
    id: "data",
    label: "Data",
    children: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "mdi:home",
        to: "/admin/dashboard",
      },
      {
        id: "data-mgmt",
        label: "Data Management",
        icon: "lucide:align-horizontal-space-between",
        children: [
          {
            id: "import",
            label: "Import",
            children: [
              { id: "csv", label: "Import CSV", to: "/admin/import-csv" },
              {
                id: "json",
                label: "Import JSON",
                to: "/data/import/json",
              },
            ],
          },
          { id: "export", label: "Export Data", to: "/data/export" },
          {
            id: "sync",
            label: "Sync",
            children: [
              { id: "local", label: "Local Sync", to: "/data/sync/local" },
              { id: "cloud", label: "Cloud Sync", to: "/data/sync/cloud" },
            ],
          },
        ],
      },
      {
        id: "reports",
        label: "Reports",
        icon: "lucide:newspaper",
        children: [
          { id: "analytics", label: "Analytics", to: "/reports/analytics" },
          { id: "sales", label: "Sales", to: "/reports/sales" },
        ],
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    children: [
      {
        id: "config",
        label: "Configuration",
        icon: "lucide:settings",
        children: [
          { id: "general", label: "General", to: "/settings/general" },
          { id: "security", label: "Security", to: "/settings/security" },
          { id: "users", label: "Users", to: "/settings/users" },
        ],
      },
      { id: "profile", label: "Profile", icon: "lucide:user", to: "/profile" },
    ],
  },
];
