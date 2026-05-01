import {
  LayoutDashboard,
  Settings,
  LucideIcon,
  UserPlus,
  UserCheck,
  UserCog,
  Box,
  Layers,
  History,
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
        icon: UserPlus, // Catatan: Mungkin lebih cocok icon Package atau List
      },
      {
        id: "product-category",
        labelKey: "Kategori Produk",
        href: "/products/category",
        icon: UserCheck, // Catatan: Mungkin lebih cocok icon Tags
      },
    ],
  },
  {
    id: "general",
    labelKey: "General",
    href: "/general",
    icon: Layers, // Menggunakan icon Layers sebagai penanda grup general
    children: [
      {
        id: "audit-logs",
        labelKey: "Audit Log",
        href: "/general/audit-logs",
        icon: History, // Icon jam berputar, sangat cocok untuk history/audit
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
        id: "store",
        labelKey: "Toko",
        href: "/settings/store",
        icon: UserCog,
      },
    ],
  },
];
