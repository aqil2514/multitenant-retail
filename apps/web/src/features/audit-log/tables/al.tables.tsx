import { DataTable } from "@/_shared/tables/data-table/data-table";
import { useAuditLog } from "../al.context";
import { useAuditLogColumns } from "./al.columns";
import { useTablePagination } from "@/_shared/hooks/use-table-pagination";

export function AuditLogTable() {
  const { data, isFetching } = useAuditLog();

  const { paginationProps } = useTablePagination(data?.meta);

  const columns = useAuditLogColumns();
  return (
    <DataTable
      columns={columns}
      data={data?.data ?? []}
      isLoading={isFetching}
      pagination={paginationProps}
    />
  );
}
