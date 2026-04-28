import { flexRender, Table } from "@tanstack/react-table";
import { DataTableEmptyState } from "./data-table-empty-state";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

interface DataTableBodyProps<TData> {
  table: Table<TData>;
  isLoading: boolean;
  onAdd?: () => void;
  colSpan: number;
}

export function DataTableBody<TData>({
  table,
  isLoading,
  onAdd,
  colSpan,
}: DataTableBodyProps<TData>) {
  const { rows } = table.getRowModel();

  return (
    <TableBody>
      {rows.length > 0 ? (
        rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <DataTableEmptyState
          colSpan={colSpan}
          isLoading={isLoading}
          onAdd={onAdd}
        />
      )}
    </TableBody>
  );
}
