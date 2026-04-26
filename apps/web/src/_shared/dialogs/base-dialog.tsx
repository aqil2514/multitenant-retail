// components/molecules/base-dialog.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

// Definisikan tipe ukuran yang tersedia
type DialogSize = "sm" | "md" | "lg" | "xl" | "full";
type DialogVariant = "default" | "danger" | "success" | "clean";

interface BaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  size?: DialogSize; // Tambahkan props size
  variant?: DialogVariant;
  className?: string; // Untuk override styling jika butuh custom mendadak
}

// Mapping ukuran ke class Tailwind
const sizeClasses: Record<DialogSize, string> = {
  sm: "sm:max-w-[425px]",
  md: "sm:max-w-[600px]",
  lg: "sm:max-w-[800px]",
  xl: "sm:max-w-[1140px]",
  full: "sm:max-w-[95vw] h-[90vh]", // Hampir layar penuh
};

const variantClasses: Record<DialogVariant, string> = {
  // Sekarang default adalah warna putih bersih
  default: "bg-white border-zinc-200 text-zinc-900",

  // Clean: Sangat minimalis dengan bayangan lembut
  clean: "bg-white border-none shadow-2xl text-zinc-900",

  // Danger: Putih dengan aksen Merah Solid
  danger: "bg-white border-red-200 border-t-4 border-t-red-600",

  // Success: Putih dengan aksen Hijau Solid
  success: "bg-white border-emerald-200 border-t-4 border-t-emerald-600",
};

export function BaseDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = "md",
  variant = "default",
  className,
}: BaseDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={twMerge(
          "overflow-y-auto max-h-[95vh] shadow-2xl p-0", // p-0 agar kita bisa atur header & body lebih leluasa
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
      >
        {/* Header Section dengan Padding yang Konsisten */}
        <div className="px-6 pt-6 pb-4">
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold tracking-tight text-black">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="text-base text-zinc-500 mt-1.5">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        </div>
        
        {/* Separator Tipis (Hanya muncul jika bukan variant clean) */}
        {variant !== "clean" && <div className="h-px bg-zinc-100 w-full" />}

        {/* Body Section */}
        <div className="px-6 py-4">
          <div className="text-zinc-800">
            {children}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
