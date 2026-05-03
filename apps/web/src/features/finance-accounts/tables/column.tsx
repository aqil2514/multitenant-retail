import { createActionColumn } from "@/_shared/tables/action-column";
import { useQueryState } from "@/_shared/hooks/use-query-state";
import { Edit, Trash, ListTree, ShieldCheck, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FinanceAccountsColumn } from "../interfaces/fa.interface";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function useAccountListColumn() {
  const { update } = useQueryState();

  const columns = createActionColumn<FinanceAccountsColumn>({
    columns: [
      {
        accessorKey: "code",
        header: "Kode",
        cell: ({ row }) => (
          <span className="font-mono font-medium text-blue-600 dark:text-blue-400">
            {row.original.code}
          </span>
        ),
      },
      {
        accessorKey: "name",
        header: "Nama Akun",
        cell: ({ row }) => {
          const isSubAccount = row.original.parentId !== null;
          return (
            <TooltipProvider>
              <div
                className={`flex items-center gap-2 ${isSubAccount ? "pl-6" : "font-bold"}`}
              >
                {isSubAccount && (
                  <ListTree className="h-3 w-3 text-muted-foreground" />
                )}
                <span>{row.original.name}</span>

                {row.original.isSystem && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ShieldCheck className="h-3.5 w-3.5 text-blue-500 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">
                        <strong>Akun Sistem:</strong> Akun ini dibuat otomatis
                        oleh sistem untuk menjaga integritas transaksi dan tidak
                        dapat dihapus.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </TooltipProvider>
          );
        },
      },
      {
        accessorKey: "category",
        header: "Kategori",
        cell: ({ row }) => (
          <Badge
            variant="secondary"
            className="font-normal uppercase text-[10px]"
          >
            {row.original.category}
          </Badge>
        ),
      },
      {
        accessorKey: "normalBalance",
        header: () => (
          <div className="flex items-center gap-1">
            <span>Saldo Normal</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-50">
                  <p className="text-xs">
                    Sisi di mana saldo akun akan <strong>bertambah</strong>.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ),
        cell: ({ row }) => (
          <Badge
            variant={
              row.original.normalBalance === "DEBIT" ? "outline" : "default"
            }
            className="font-normal"
          >
            {row.original.normalBalance}
          </Badge>
        ),
      },
      {
        accessorKey: "type",
        header: "Tipe",
        cell: ({ row }) => (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-xs text-muted-foreground cursor-help decoration-dotted underline-offset-4 underline">
                  {row.original.isHeader ? "Header" : "Detail"}
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-62.5">
                <p className="text-xs">
                  {row.original.isHeader
                    ? "Grup akun untuk kategori tertentu. Tidak dapat digunakan langsung dalam transaksi."
                    : "Akun operasional yang digunakan untuk mencatat setiap transaksi."}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ),
      },
    ],
    getMenuItems: (row) => {
      const items = [
        {
          label: "Edit Akun",
          icon: Edit,
          onClick: () => update({ id: row.id, dialog: "edit" }),
        },
      ];

      if (!row.isSystem) {
        items.push({
          label: "Hapus",
          icon: Trash,
          onClick: () => update({ id: row.id, dialog: "delete" }),
        });
      }

      return items;
    },
    dropdownLabel: (row) => `Akun: ${row.name}`,
    position: "start",
    actionAlignment: "left",
  });

  return columns;
}
