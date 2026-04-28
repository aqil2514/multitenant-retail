import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";

export function DataTableEmptyState({ 
  isLoading, 
  onAdd, 
  colSpan 
}: { 
  isLoading: boolean; 
  onAdd?: () => void; 
  colSpan: number 
}) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-100 text-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Memuat data...</p>
          </div>
        ) : (
          <div className="mx-auto flex max-w-105 flex-col items-center justify-center space-y-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Plus className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Belum ada data</h3>
              <p className="text-sm text-muted-foreground">Mulai dengan menambahkan data pertama Anda.</p>
            </div>
            {onAdd && (
              <Button onClick={onAdd} size="sm" className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Data
              </Button>
            )}
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}