/* eslint-disable react-hooks/incompatible-library */
"use client";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table } from "@/components/ui/table";

// Internal Components
import { DataTableHeader } from "./data-table-header";
import { DataTableBody } from "./data-table-body";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableProgressBar } from "./data-table-progress-bar";
import { DataTablePaginationProps } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: DataTablePaginationProps;
  isLoading?: boolean;
  onAdd?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  isLoading = false,
  onAdd,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-md border">
        <DataTableProgressBar visible={isLoading} />

        <Table className={isLoading ? "opacity-50 transition-opacity" : ""}>
          <DataTableHeader table={table} />
          <DataTableBody
            table={table}
            isLoading={isLoading}
            onAdd={onAdd}
            colSpan={columns.length}
          />
        </Table>
      </div>

      {pagination && <DataTablePagination {...pagination} />}
    </div>
  );
}