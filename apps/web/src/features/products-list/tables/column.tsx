import { createActionColumn } from "@/_shared/tables/action-column";
import { useQueryState } from "@/_shared/hooks/use-query-state";
import { Edit, Trash, AlertTriangle } from "lucide-react";
import { ProductListFetchRes } from "../interfaces/pl.interface";
import { Badge } from "@/components/ui/badge";

export function useProductListColumn() {
  const { update } = useQueryState();

  const columns = createActionColumn<ProductListFetchRes>({
    columns: [
      {
        accessorKey: "sku",
        header: "SKU",
      },
      {
        accessorKey: "name",
        header: "Nama Produk",
      },
      {
        accessorKey: "category.name",
        header: "Kategori",
        cell: ({ row }) => (
          <Badge variant="outline" className="font-normal">
            {row.original.category?.name ?? "Tanpa Kategori"}
          </Badge>
        ),
      },
      {
        accessorKey: "stock",
        header: "Stok",
        cell: ({ row }) => {
          const isLowStock = row.original.stock <= row.original.minStock;
          return (
            <div className="flex flex-col gap-1">
              <div
                className={`flex items-center gap-1.5 font-medium ${isLowStock ? "text-destructive" : "text-foreground"}`}
              >
                {isLowStock && <AlertTriangle className="h-3.5 w-3.5" />}
                {row.original.stock} {row.original.unit.name}
              </div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Min: {row.original.minStock}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "updatedAt",
        header: "Terakhir Update",
        cell: ({ row }) => {
          return new Date(row.original.updatedAt).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        },
      },
    ],
    getMenuItems: (row) => [
      {
        label: "Edit Produk",
        icon: Edit,
        onClick: () => update({ id: row.id, dialog: "edit" }),
      },
      {
        label: "Hapus",
        icon: Trash,
        onClick: () => update({ id: row.id, dialog: "delete" }),
        variant: "danger",
      },
    ],
    dropdownLabel: (row) => `Opsi: ${row.name}`,
    position: "start",
    actionAlignment: "left",
  });

  return columns;
}
