// assets
import { IconDashboard, IconDeviceAnalytics, IconUser } from "@tabler/icons";

// constant
const icons = {
  IconDashboard: IconDashboard,
  IconDeviceAnalytics,
};

//-----------------------|| DASHBOARD MENU ITEMS ||-----------------------//

const dashboard = {
  id: "dashboard",
  title: "Dashboard",
  type: "group",
  children: [
    {
      title: "Dashboard",
      type: "item",
      url: "/profile",
      icon: icons["IconDashboard"],
      breadcrumbs: false,
    },
    {
      title: "Products",
      type: "item",
      url: "/profile/admin",
      icon: icons["IconDeviceAnalytics"],
      breadcrumbs: false,
    },
  ],
};

const menuItems = {
  items: [dashboard],
};

export default menuItems;
