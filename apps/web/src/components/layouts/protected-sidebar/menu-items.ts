import {
  LayoutDashboard,
  Settings,
  LucideIcon,
  UserPlus,
  UserCheck,
  UserCog,
  Box,
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
    labelKey: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "products",
    labelKey: "Produk",
    href: "/products",
    icon: Box,
    children: [
      {
        id: "product-list",
        labelKey: "List Produk",
        href: "/products/list",
        icon: UserPlus,
      },
      {
        id: "product-category",
        labelKey: "Kategori Produk",
        href: "/products/category",
        icon: UserCheck,
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
