import {
  LayoutDashboard,
  Users,
  Settings,
  LucideIcon,
  UserPlus,
  UserCheck,
  Tags,
  UserCog,
} from "lucide-react";

export interface SidebarMenuItem {
  id: string;
  labelKey: string;
  href: string;
  icon: LucideIcon;
  children?: SidebarMenuItem[];
}

export const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  {
    id: "dashboard",
    labelKey: "dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "customers",
    labelKey: "customers",
    href: "/customers",
    icon: Users,
    children: [
      {
        id: "customer-list",
        labelKey: "customer_list",
        href: "/customers/list",
        icon: UserPlus,
      },
      {
        id: "customer-status",
        labelKey: "customer_status",
        href: "/customers/status",
        icon: UserCheck,
      },
      {
        id: "customer-categories",
        labelKey: "customer_categories",
        href: "/customers/categories",
        icon: Tags,
      },
    ],
  },
  {
    id: "settings",
    labelKey: "settings",
    href: "/settings",
    icon: Settings,
    children: [
      {
        id: "profile",
        labelKey: "profile",
        href: "/settings/profile",
        icon: UserCog,
      },
    ],
  },
];
