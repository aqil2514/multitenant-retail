import React from "react";
import { Loader2, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RefetchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isFetching: boolean;
  onRefetch: () => void;
}

const RefetchButton = React.forwardRef<HTMLButtonElement, RefetchButtonProps>(
  ({ isFetching, onRefetch, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost" // Atau variant lain sesuai kebutuhan UI Audit Log Anda
        size="icon"
        disabled={isFetching || props.disabled}
        onClick={onRefetch}
        className={cn("h-9 w-9", className)}
        {...props}
      >
        {isFetching ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RotateCw className="h-4 w-4" />
        )}
      </Button>
    );
  },
);

RefetchButton.displayName = "RefetchButton";

export { RefetchButton };
