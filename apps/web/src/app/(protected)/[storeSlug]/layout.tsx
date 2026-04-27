import { Header } from "@/components/layouts/header";
import { ProtectedSidebar } from "@/components/layouts/protected-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-zinc-50/50">
      <ProtectedSidebar />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
