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
      url: "/admin",
      icon: IconDashboard,
      breadcrumbs: false,
    },
    {
      title: "Analytics",
      type: "item",
      url: "/admin/analytics",
      icon: IconDeviceAnalytics,
      breadcrumbs: false,
    },
  ],
};

const management = {
  id: "dashboard",
  title: "Management",
  type: "group",
  children: [
    {
      title: "Products",
      type: "item",
      url: "/admin/products",
      icon: IconBasket,
      breadcrumbs: false,
    },
  ],
};

const menuItems = {
  items: [dashboard, management],
};

export default menuItems;
