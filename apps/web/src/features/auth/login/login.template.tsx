"use client";
import { useSearchParams } from "next/navigation";
import { LoginAction } from "./components/login-action";
import { LoginImage } from "./components/login-image";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function LoginTemplate() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("logout") === "success") {
      toast.success("Berhasil logout");
    }
  }, [searchParams]);

  return (
    <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-2">
      <div className="hidden bg-muted md:block">
        <LoginImage />
      </div>
      <div className="flex items-center justify-center p-8">
        <LoginAction />
      </div>
    </div>
  );
}
