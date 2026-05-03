import { DataTable } from "@/_shared/tables/data-table/data-table";
import { useFinanceJournals } from "../fj.context";
import { useFinanceJournalsColumn } from "./column";

export function FinanceJournalsTable() {
  const { data } = useFinanceJournals();
  const columns = useFinanceJournalsColumn();

  return <DataTable columns={columns} data={data ?? []} />;
}
