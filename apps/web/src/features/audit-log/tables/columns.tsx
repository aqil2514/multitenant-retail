import { createActionColumn } from "@/_shared/tables/action-column";
import { useQueryState } from "@/_shared/hooks/use-query-state";
import { Eye, Monitor, User } from "lucide-react";
import { AuditLogTable } from "../interfaces/al.interface";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns"; // Atau gunakan Intl.DateTimeFormat
import { id } from "date-fns/locale";
import { Badge } from "@/components/ui/badge"; // Asumsi menggunakan shadcn/ui
import { SYSTEM_USER_ID } from "@/constants/common";
import { modulLables } from "./label";

const baseColumn: ColumnDef<AuditLogTable>[] = [
  {
    accessorKey: "createdAt",
    header: "Waktu",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="font-medium">
            {format(new Date(row.original.createdAt), "dd MMM yyyy", {
              locale: id,
            })}
          </span>
          <span className="text-xs text-muted-foreground">
            {format(new Date(row.original.createdAt), "HH:mm:ss")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "user.name",
    header: "Pelaku ",
    cell: ({ row }) => {
      const isSystem = row.original.user.id === SYSTEM_USER_ID;
      return (
        <div className="flex items-center gap-2">
          {isSystem ? (
            <Monitor className="h-4 w-4 text-blue-500" />
          ) : (
            <User className="h-4 w-4 text-gray-500" />
          )}
          <span className={isSystem ? "text-blue-600 font-semibold" : ""}>
            {isSystem ? "Sistem" : row.original.user.name}
          </span>
        </div>
      );
    },
  },
  {
    id: "activity",
    accessorKey: "action",
    header: "Aktivitas",
    cell: ({ row }) => {
      return (
        <Badge variant="outline">
          {row.original.action}
        </Badge>
      );
    },
  },
  {
    accessorKey: "entity",
    header: "Modul",
    cell: ({ row }) => modulLables[row.original.entity],
  },
];

export function useAuditLogColumns() {
  const { update } = useQueryState();

  const columns = createActionColumn<AuditLogTable>({
    columns: baseColumn, // Masukkan baseColumn ke sini
    getMenuItems: (row) => [
      {
        label: "Detail",
        icon: Eye,
        variant: "info",
        onClick: () => {
          update({
            id: row.id,
            dialog: "detail",
          });
        },
      },
    ],
    dropdownLabel: (row) => `Log ID: ${row.id.substring(0, 8)}`,
    position: "start",
    actionAlignment: "left",
  });

  return columns;
}
