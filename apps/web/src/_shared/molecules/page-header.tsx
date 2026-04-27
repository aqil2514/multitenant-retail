import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Heading, Subtext } from "../atoms/typography";

interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

export function PageHeader({
  title,
  description,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div className={cn("grid gap-1", className)} {...props}>
      <Heading>{title}</Heading>
      {description && <Subtext>{description}</Subtext>}
    </div>
  );
}
