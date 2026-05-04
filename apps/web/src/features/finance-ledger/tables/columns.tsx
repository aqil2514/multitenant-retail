import { createActionColumn } from "@/_shared/tables/action-column";
import { NotebookText, Hash } from "lucide-react";
import { JournalEntry } from "../interfaces/fl.interface";
import { formatDate } from "@/_shared/utils/format-date";

export function useFinanceLedgerColumn() {
  const columns = createActionColumn<JournalEntry>({
    columns: [
      {
        accessorKey: "date",
        header: "Tanggal & Ref",
        cell: ({ row }) => (
          <div className="flex flex-col gap-1 min-w-30">
            <div className="flex items-center gap-1.5 font-medium text-sm">
              <NotebookText className="h-3.5 w-3.5 text-muted-foreground" />
              {formatDate(row.original.date, "Senin, 29 Desember 2025, 09:21")}
            </div>
            {row.original.reference && (
              <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded w-fit">
                <Hash className="h-2.5 w-2.5" />
                {row.original.reference}
              </div>
            )}
          </div>
        ),
      },
      {
        accessorKey: "description",
        header: "Keterangan",
        cell: ({ row }) => (
          <p className="text-sm font-semibold">{row.original.description}</p>
        ),
      },
      {
        header: "Debit",
        cell: ({ row }) => {
          const total = row.original.items.reduce(
            (sum, item) => sum + Number(item.debit),
            0,
          );
          return (
            <div className="text-right font-mono text-xs text-blue-600 dark:text-blue-400">
              {total > 0 ? Intl.NumberFormat("id-ID").format(total) : "-"}
            </div>
          );
        },
      },
      {
        header: "Kredit",
        cell: ({ row }) => {
          const total = row.original.items.reduce(
            (sum, item) => sum + Number(item.credit),
            0,
          );
          return (
            <div className="text-right font-mono text-xs text-orange-600 dark:text-orange-400">
              {total > 0 ? Intl.NumberFormat("id-ID").format(total) : "-"}
            </div>
          );
        },
      },
      {
        header: "Saldo Berjalan",
        cell: ({ row, table }) => {
          const rows = table.getRowModel().rows;
          const currentIndex = rows.findIndex((r) => r.id === row.id);
          const openingBalance =
            (table.options.meta as { openingBalance?: number })
              ?.openingBalance ?? 0;

          const runningBalance = rows
            .slice(0, currentIndex + 1)
            .reduce((balance, r) => {
              const debit = r.original.items.reduce(
                (sum, item) => sum + Number(item.debit),
                0,
              );
              const credit = r.original.items.reduce(
                (sum, item) => sum + Number(item.credit),
                0,
              );
              return balance + debit - credit;
            }, openingBalance);

          return (
            <div className="text-right font-mono text-xs font-semibold">
              {Intl.NumberFormat("id-ID").format(runningBalance)}
            </div>
          );
        },
      },
    ],
    getMenuItems: () => [],
    dropdownLabel: (row) => `Jurnal: ${row.reference || row.description}`,
    position: "start",
    actionAlignment: "left",
  });

  return columns;
}
