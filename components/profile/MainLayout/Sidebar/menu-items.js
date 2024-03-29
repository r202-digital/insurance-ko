// assets
import { IconDashboard, IconDeviceAnalytics, IconBasket } from "@tabler/icons";

//-----------------------|| DASHBOARD MENU ITEMS ||-----------------------//

const dashboard = {
  id: "dashboard",
  title: "Dashboard",
  type: "group",
  children: [
    {
      title: "Overview",
      type: "item",
      url: "/profile",
      icon: IconDashboard,
      breadcrumbs: false,
    },
    {
      title: "Analytics",
      type: "item",
      url: "/profile/analytics",
      icon: IconDeviceAnalytics,
      breadcrumbs: false,
    },
  ],
};

const menuItems = {
  items: [dashboard],
};

export default menuItems;
