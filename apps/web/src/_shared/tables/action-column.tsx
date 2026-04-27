import { ColumnDef } from "@tanstack/react-table";
import { LucideIcon, MoreHorizontal } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export interface MenuItems {
  label: string;
  icon: LucideIcon;
  className?: string;
  onClick: () => void;
  variant?:
    | "default"
    | "danger"
    | "warning"
    | "success"
    | "primary"
    | "info"
    | "muted";
}

const getVariantClass = (variant?: string) => {
  switch (variant) {
    case "primary":
      // Warna Biru Indigo (cocok untuk aksi seperti 'Publish' atau 'Submit')
      return "text-indigo-600 focus:text-white focus:bg-indigo-600";

    case "info":
      // Warna Biru Langit (cocok untuk 'View Detail' atau 'Info')
      return "text-sky-600 focus:text-white focus:bg-sky-500";

    case "success":
      // Warna Emerald (cocok untuk 'Approve' atau 'Complete')
      return "text-emerald-600 focus:text-white focus:bg-emerald-600";

    case "warning":
      // Warna Amber (cocok untuk 'Edit' atau 'Archive')
      return "text-amber-600 focus:text-white focus:bg-amber-500";

    case "danger":
      // Warna Merah (cocok untuk 'Delete' atau 'Stop Process')
      return "text-red-600 focus:text-white focus:bg-red-600";

    case "muted":
      // Warna Abu-abu (cocok untuk aksi yang kurang penting/opsional)
      return "text-slate-400 focus:text-slate-900 focus:bg-slate-100";

    default:
      // Standar: Slate 700 (untuk keterbacaan tinggi di bg-white)
      return "text-slate-700 focus:text-slate-900 focus:bg-slate-100";
  }
};

interface ActionCellProps {
  dropdownLabel: string;
  menuItems: MenuItems[];
  dropdownClassName?: string;
  actionAlignment?: "left" | "right";
}

const ActionCell: React.FC<ActionCellProps> = ({
  dropdownLabel,
  menuItems,
  dropdownClassName = "w-44",
  actionAlignment = "right",
}) => {
  const wrapperClass = actionAlignment === "left" ? "text-left" : "text-right";
  const dropdownAlign = actionAlignment === "left" ? "start" : "end";

  // Variant warna khusus untuk Background Terang

  return (
    <div className={wrapperClass}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            // Button pemicu tetap mengikuti tema dashboard (slate-400)
            className="h-8 w-8 p-0 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align={dropdownAlign}
          // WARNA TERANG: bg-white dengan border halus
          className={cn(
            "bg-white border-slate-200 shadow-xl p-1.5",
            dropdownClassName,
          )}
        >
          <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-slate-400 px-2 py-1.5 font-bold">
            {dropdownLabel}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-100 my-1" />

          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const variantClass = getVariantClass(item.variant);

            return (
              <DropdownMenuItem
                key={`${item.label}-${idx}`}
                className={cn(
                  "flex items-center px-2 py-2 text-sm cursor-pointer rounded-md transition-all duration-150",
                  variantClass,
                  item.className,
                )}
                onClick={item.onClick}
              >
                <Icon className="mr-2.5 h-4 w-4 opacity-70" />
                <span className="font-medium">{item.label}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

interface CreateActionColumnConfig<TData> {
  columns: ColumnDef<TData>[];
  getMenuItems: (row: TData) => MenuItems[];
  dropdownLabel?: ((row: TData) => string) | string;
  dropdownWidth?: string;
  actionAlignment?: "left" | "right";
  position?: "start" | "end";
}

export function createActionColumn<TData>(
  config: CreateActionColumnConfig<TData>,
): ColumnDef<TData>[] {
  const {
    columns,
    getMenuItems,
    dropdownLabel = "Aksi",
    dropdownWidth = "w-40",
    actionAlignment = "right",
    position = "end",
  } = config;

  const actionColumn: ColumnDef<TData> = {
    id: "action",
    header: () => (
      <div className={actionAlignment === "left" ? "text-left" : "text-right"}>
        Aksi
      </div>
    ),
    cell: ({ row }) => (
      <ActionCell
        dropdownLabel={
          typeof dropdownLabel === "function"
            ? dropdownLabel(row.original)
            : dropdownLabel
        }
        menuItems={getMenuItems(row.original)}
        dropdownClassName={dropdownWidth}
        actionAlignment={actionAlignment}
      />
    ),
  };

  return position === "start"
    ? [actionColumn, ...columns]
    : [...columns, actionColumn];
}
