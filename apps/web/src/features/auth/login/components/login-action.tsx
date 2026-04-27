"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { serverUrl } from "@/constants/urls";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

export function LoginAction() {
  const router = useRouter();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.status === "success") {
        toast.success("Berhasil masuk", {
          position: "top-center",
          autoClose: 3000,
        });

        axios.get("/api/stores").then(({ data: stores }) => {
          if (!stores || stores.length === 0) {
            router.push("/onboarding");
          } else {
            router.push(`/${stores[0].slug}/dashboard`);
          }
        });
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [router]);

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const url = `${serverUrl}/auth/google`;

    window.open(
      url,
      "Google Login",
      `width=${width},height=${height},left=${left},top=${top},status=no,menubar=no,toolbar=no`,
    );
  };

  return (
    <div className="w-full max-w-100 px-4">
      {" "}
      {/* Mengubah max-w-100 menjadi 400px agar proporsional */}
      <Card className="border-none shadow-none md:shadow-sm md:border">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Selamat Datang</CardTitle>
          <CardDescription>
            Masuk ke akun Multitenant Retail Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            variant="outline"
            className="w-full py-6 text-base font-medium flex gap-3"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="text-xl" />
            Lanjutkan dengan Google
          </Button>
        </CardContent>
      </Card>
      <p className="mt-6 text-center text-xs text-muted-foreground leading-relaxed">
        Dengan melanjutkan, Anda menyetujui Syarat Layanan dan Kebijakan Privasi
        kami.
      </p>
    </div>
  );
}
