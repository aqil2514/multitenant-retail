"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SIDEBAR_MENU_ITEMS } from "./menu-items";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SIDEBAR_LABELS: Record<string, string> = {
  main_menu: "Menu Utama",
  dashboard: "Dashboard",
  customers: "Pelanggan",
  customer_list: "Daftar Pelanggan",
  customer_status: "Status Pelanggan",
  customer_categories: "Kategori Pelanggan",
  settings: "Pengaturan",
  profile: "Profil",
};

function getSidebarLabel(key: string) {
  return SIDEBAR_LABELS[key] ?? key;
}

export function ProtectedSidebar() {
  const pathname = usePathname(); // Ambil path saat ini

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="bg-zinc-950">
      <SidebarHeader className="h-16 flex items-center justify-start border-b">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold text-sm">
            M
          </div>
          <h2 className="text-lg font-bold tracking-tight group-data-[collapsible=icon]:hidden">
            Multitenant Retail
          </h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{getSidebarLabel("main_menu")}</SidebarGroupLabel>
          <SidebarMenu>
            {SIDEBAR_MENU_ITEMS.map((item) => {
              const hasChildren = item.children && item.children.length > 0;

              // Cek apakah path saat ini sama dengan href menu utama
              const isParentActive = pathname === item.href;

              // Cek apakah ada anak dari menu ini yang sedang aktif
              const isChildActive = item.children?.some(
                (child) => pathname === child.href,
              );

              if (!hasChildren) {
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      tooltip={getSidebarLabel(item.labelKey)}
                      isActive={isParentActive} // Shadcn Sidebar mendukung prop isActive
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 py-5"
                      >
                        <item.icon
                          className={`w-5 h-5 ${isParentActive ? "opacity-100" : "opacity-70"}`}
                        />
                        <span
                          className={
                            isParentActive ? "font-bold" : "font-medium"
                          }
                        >
                          {getSidebarLabel(item.labelKey)}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }

              return (
                <Collapsible
                  key={item.id}
                  asChild
                  className="group/collapsible"
                  defaultOpen={isChildActive} // Buka otomatis jika ada anak yang aktif
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={getSidebarLabel(item.labelKey)}
                        isActive={isChildActive} // Tandai parent jika anaknya aktif
                      >
                        <item.icon
                          className={`w-5 h-5 ${isChildActive ? "opacity-100" : "opacity-70"}`}
                        />
                        <span
                          className={
                            isChildActive ? "font-bold" : "font-medium"
                          }
                        >
                          {getSidebarLabel(item.labelKey)}
                        </span>
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.children?.map((child) => {
                          const isSubActive = pathname === child.href;
                          return (
                            <SidebarMenuSubItem key={child.id}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isSubActive}
                              >
                                <Link href={child.href}>
                                  <span
                                    className={
                                      isSubActive
                                        ? "font-bold text-slate-500"
                                        : ""
                                    }
                                  >
                                    {getSidebarLabel(child.labelKey)}
                                  </span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t" />
    </Sidebar>
  );
}
