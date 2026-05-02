import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type DialogSize = "sm" | "md" | "lg" | "xl" | "full";
type DialogVariant = "default" | "danger" | "success" | "clean";

interface BaseAlertDialogProps {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  size?: DialogSize;
  variant?: DialogVariant;
  className?: string;
}

const sizeClasses: Record<DialogSize, string> = {
  sm: "sm:max-w-[425px]",
  md: "sm:max-w-[600px]",
  lg: "sm:max-w-[800px]",
  xl: "sm:max-w-[1140px]",
  full: "sm:max-w-[95vw] h-[90vh]",
};

const variantClasses: Record<DialogVariant, string> = {
  default: "bg-white border-zinc-200 text-zinc-900",
  clean: "bg-white border-none shadow-2xl text-zinc-900",
  danger: "bg-white border-red-200 border-t-4 border-t-red-600",
  success: "bg-white border-emerald-200 border-t-4 border-t-emerald-600",
};

export function BaseAlertDialog({
  open,
  title,
  description,
  children,
  size = "md",
  variant = "default",
  className,
}: BaseAlertDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent
        className={twMerge(
          "overflow-y-auto max-h-[95vh] shadow-2xl p-0",
          sizeClasses[size],
          variantClasses[variant],
          className,
        )}
      >
        <div className="px-6 pt-6 pb-4">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-extrabold tracking-tight text-black">
              {title}
            </AlertDialogTitle>
            {description && (
              <AlertDialogDescription className="text-base text-zinc-500 mt-1.5">
                {description}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
        </div>

        {variant !== "clean" && <div className="h-px bg-zinc-100 w-full" />}

        <div className="px-6 py-4">
          <div className="text-zinc-800">{children}</div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}