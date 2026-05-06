import { createActionColumn } from "@/_shared/tables/action-column";
import { useQueryState } from "@/_shared/hooks/use-query-state";
import { Edit, Trash, NotebookText, Hash } from "lucide-react";
import { JournalEntry } from "../interfaces/fj.interface";
import { cn } from "@/lib/utils";
import { formatDate } from "@/_shared/utils/format-date";

export function useFinanceJournalsColumn() {
  const { update } = useQueryState();
  
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
        header: "Keterangan & Rincian Akun",
        cell: ({ row }) => (
          <div className="space-y-3 py-2 min-w-62.5">
            <p className="text-sm font-semibold leading-none">
              {row.original.description}
            </p>
            <div className="space-y-1.5 border-l-2 border-zinc-100 dark:border-zinc-800 pl-3">
              {row.original.items.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "text-xs flex items-center gap-2",
                    Number(item.credit) > 0 &&
                      "pl-6 text-muted-foreground italic",
                  )}
                >
                  <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-1 rounded">
                    {item.account.code}
                  </span>
                  <span>{item.account.name}</span>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        header: "Debit",
        cell: ({ row }) => (
          <div className="space-y-1.5 pt-7">
            {row.original.items.map((item) => (
              <div
                key={item.id}
                className="h-4 text-right font-mono text-xs text-blue-600 dark:text-blue-400"
              >
                {Number(item.debit) > 0
                  ? Intl.NumberFormat("id-ID").format(Number(item.debit))
                  : "-"}
              </div>
            ))}
          </div>
        ),
      },
      {
        header: "Kredit",
        cell: ({ row }) => (
          <div className="space-y-1.5 pt-7">
            {row.original.items.map((item) => (
              <div
                key={item.id}
                className="h-4 text-right font-mono text-xs text-orange-600 dark:text-orange-400"
              >
                {Number(item.credit) > 0
                  ? Intl.NumberFormat("id-ID").format(Number(item.credit))
                  : "-"}
              </div>
            ))}
          </div>
        ),
      },
    ],
    getMenuItems: (row) => [
      {
        label: "Edit Jurnal",
        icon: Edit,
        onClick: () => update({ id: row.id, dialog: "edit" }),
      },
      {
        label: "Hapus (Void)",
        icon: Trash,
        onClick: () => update({ id: row.id, dialog: "delete" }),
        variant: "danger",
      },
    ],
    dropdownLabel: (row) => `Jurnal: ${row.reference || row.description}`,
    position: "start",
    actionAlignment: "left",
  });

  return columns;
}
