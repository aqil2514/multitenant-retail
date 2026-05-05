import { DataTable } from "@/_shared/tables/data-table/data-table";
import { usePurchaseSuppliers } from "../ps.context";
import { usePurchaseSupplierColumn } from "./ps.columns";

export function PurchaseSupplierTable() {
  const { data, isFetching } = usePurchaseSuppliers();
  const columns = usePurchaseSupplierColumn();

  return (
    <DataTable columns={columns} data={data ?? []} isLoading={isFetching} />
  );
}
