"use client";

import { LogOut, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { serverUrl } from "@/constants/urls";

export function HeaderOnboarding() {
  const router = useRouter();
  const handleLogout = () => {
    router.push(`${serverUrl}/auth/logout?from=onboarding`);
  };

  return (
    <header className="h-16 border-b border-slate-100 bg-white flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Sisi Kiri: Brand Placeholder */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center">
          <Store className="text-white" size={20} strokeWidth={2} />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-slate-800 leading-none">
            Retail System
          </span>
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-1">
            Fase Onboarding
          </span>
        </div>
      </div>

      {/* Sisi Kanan: Tombol Logout Langsung */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all flex gap-2 items-center"
        >
          <LogOut size={18} strokeWidth={2} />
          <span className="font-medium">Keluar</span>
        </Button>
      </div>
    </header>
  );
}
