import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface ButtonLoadingProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
  loadingText?: string;
}

export const ButtonLoading = React.forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  ({ 
    children, 
    isLoading = false, 
    loadingText, 
    className, 
    disabled, 
    ...props 
  }, ref) => {
    return (
      <Button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn("relative flex items-center justify-center gap-2", className)}
        {...props}
      >
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin text-current" />
        )}
        
        <span>
          {isLoading && loadingText ? loadingText : children}
        </span>
      </Button>
    );
  }
);

ButtonLoading.displayName = "ButtonLoading";