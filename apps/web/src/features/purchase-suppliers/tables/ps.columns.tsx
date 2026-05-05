import { createActionColumn } from "@/_shared/tables/action-column";
import { useQueryState } from "@/_shared/hooks/use-query-state";
import { Edit, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PurchaseSupplier } from "../interfaces/ps.interface";

export function usePurchaseSupplierColumn() {
  const { update } = useQueryState();

  const columns = createActionColumn<PurchaseSupplier>({
    columns: [
      {
        accessorKey: "code",
        header: "Kode",
        cell: ({ row }) => (
          <span className="font-mono font-medium text-blue-600 dark:text-blue-400">
            {row.original.code ?? "-"}
          </span>
        ),
      },
      {
        accessorKey: "name",
        header: "Nama Supplier",
        cell: ({ row }) => <span>{row.original.name}</span>,
      },
      {
        accessorKey: "phone",
        header: "Telepon",
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {row.original.phone ?? "-"}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            variant={row.original.status === "ACTIVE" ? "default" : "secondary"}
            className="font-normal"
          >
            {row.original.status}
          </Badge>
        ),
      },
    ],
    getMenuItems: (row) => [
      {
        label: "Edit Supplier",
        icon: Edit,
        onClick: () => update({ id: row.id, dialog: "edit" }),
      },
      {
        label: "Hapus",
        icon: Trash,
        onClick: () => update({ id: row.id, dialog: "delete" }),
      },
    ],
    dropdownLabel: (row) => `Supplier: ${row.name}`,
    position: "start",
    actionAlignment: "left",
  });

  return columns;
}
