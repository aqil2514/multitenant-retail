import { DataTable } from "@/_shared/tables/data-table";
import { useProductsCategoryColumns } from "./pc.column";
import { useProductCategory } from "../pc.context";

export function ProductsCategoryTable() {
  const { data } = useProductCategory();
  const columns = useProductsCategoryColumns();

  return <DataTable data={data ?? []} columns={columns} />;
}
