import { DataTable } from "@/_shared/tables/data-table/data-table";
import { useFinanceAccounts } from "../fa.context";
import { useAccountListColumn } from "./fa.column";

export function ProductListTable() {
  const { data, isFetching } = useFinanceAccounts();
  const columns = useAccountListColumn();

  return (
    <DataTable columns={columns} data={data ?? []} isLoading={isFetching} />
  );
}
