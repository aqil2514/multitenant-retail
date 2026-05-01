import { cn } from "@/lib/utils"; // Gunakan utility cn dari shadcn untuk merge class

interface DataBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export const DataBadge: React.FC<DataBadgeProps> = ({
  label,
  value,
  icon,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col border rounded-lg px-4 py-2 bg-secondary/20 min-w-25 transition-colors hover:bg-secondary/30",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">
          {label}
        </span>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <span className="text-sm font-semibold truncate">{value}</span>
    </div>
  );
};
