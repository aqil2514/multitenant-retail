"use client";

import { Search, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { UserHeader } from "@/@types/auth";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserDropdown } from "./user-dropdown";
import { NotificationDropdown } from "./notification-dropdown";

export function Header() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user-header"],
    queryFn: async () => {
      const { data } = await api.get<UserHeader>("auth/user");
      return data;
    },
  });

  return (
    <header className="h-16 border-b border-slate-100 bg-white flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center">
        <SidebarTrigger className="text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all" />
      </div>

      <div className="flex items-center gap-1">
        <div className="flex items-center gap-1 pr-2">
          <Button variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors">
            <Search size={19} strokeWidth={1.5} />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors">
            <HelpCircle size={19} strokeWidth={1.5} />
          </Button>
          <NotificationDropdown />
        </div>

        {/* Gunakan komponen UserDropdown di sini */}
        <UserDropdown user={user} isLoading={isLoading} />
      </div>
    </header>
  );
}