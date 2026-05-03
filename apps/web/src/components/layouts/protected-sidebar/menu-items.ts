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
  Wallet,
  ListTree,
  NotebookText,
  BookOpen,
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
    id: "general",
    labelKey: "General",
    href: "/general",
    icon: Layers,
    children: [
      {
        id: "dashboard",
        labelKey: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        id: "audit-logs",
        labelKey: "Audit Log",
        href: "/general/audit-logs",
        icon: History,
      },
    ],
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
    id: "finance",
    labelKey: "Keuangan",
    href: "/finance",
    icon: Wallet,
    children: [
      {
        id: "chart-of-accounts",
        labelKey: "Daftar Akun",
        href: "/finance/accounts",
        icon: ListTree,
      },
      {
        id: "journal-entries",
        labelKey: "Jurnal Umum",
        href: "/finance/journals",
        icon: NotebookText,
      },
      {
        id: "ledger",
        labelKey: "Buku Besar",
        href: "/finance/ledger",
        icon: BookOpen,
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
