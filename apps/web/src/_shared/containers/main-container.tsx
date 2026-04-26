import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface MainContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function MainContainer({
  children,
  className,
  ...props
}: MainContainerProps) {
  return (
    <div
      className={cn(
        "w-full px-4 py-6 md:px-8 md:py-10 max-w-360 mx-auto space-y-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
