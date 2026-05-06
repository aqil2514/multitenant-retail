import {
  LayoutDashboard,
  Settings,
  LucideIcon,
  UserCog,
  Box,
  Tags,
  Package,
  History,
  Wallet,
  ListTree,
  NotebookText,
  BookOpen,
  Layers,
  Truck,
  Users,
  ClipboardList,
  PackageCheck,
  PackageMinus,
  CreditCard,
  HandCoins,
  Scale,
  DollarSign,
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
        icon: Package,
      },
      {
        id: "product-category",
        labelKey: "Kategori Produk",
        href: "/products/category",
        icon: Tags,
      },
    ],
  },
  {
    id: "purchase",
    labelKey: "Pembelian",
    href: "/purchase",
    icon: Truck,
    children: [
      {
        id: "supplier",
        labelKey: "Supplier",
        href: "/purchase/suppliers",
        icon: Users,
      },
      {
        id: "purchase-order",
        labelKey: "Purchase Order",
        href: "/purchase/orders",
        icon: ClipboardList,
      },
      {
        id: "goods-receipt",
        labelKey: "Penerimaan Barang",
        href: "/purchase/receipts",
        icon: PackageCheck,
      },
      {
        id: "purchase-return",
        labelKey: "Retur Pembelian",
        href: "/purchase/returns",
        icon: PackageMinus,
      },
      {
        id: "supplier-payment",
        labelKey: "Hutang Supplier",
        href: "/purchase/payments",
        icon: CreditCard,
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
      {
        id: "cash-flow",
        labelKey: "Arus Kas",
        href: "/finance/cashflow",
        icon: HandCoins,
      },
      {
        id: "balance-sheet",
        labelKey: "Neraca",
        href: "/finance/balance",
        icon: Scale,
      },
      {
        id: "profit-and-loss",
        labelKey: "Laba Rugi",
        href: "/finance/profit-and-loss",
        icon: DollarSign,
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
