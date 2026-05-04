import { DataTable } from "@/_shared/tables/data-table/data-table";
import { useFinanceLedger } from "../fl.context";
import { useFinanceLedgerColumn } from "./columns";

export function FinanceLedgerTable() {
  const { data } = useFinanceLedger();
  const columns = useFinanceLedgerColumn();

  return <DataTable columns={columns} data={data?.data ?? []} />;
}
