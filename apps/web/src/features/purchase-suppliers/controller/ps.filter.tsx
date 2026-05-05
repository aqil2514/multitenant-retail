import { FilterConfig } from "@/_shared/filters/filter.config";
import { useFilterSearchParams } from "@/_shared/filters/filter.hooks";
import { FilterPanel } from "@/_shared/filters/panel";

const config = [
  { type: "text", key: "name", label: "Nama Supplier" },
  { type: "text", key: "code", label: "Kode Supplier" },
  {
    type: "select",
    key: "status",
    label: "Status",
    options: [
      { value: "ACTIVE", label: "Aktif" },
      { value: "INACTIVE", label: "Tidak Aktif" },
    ],
  },
] satisfies FilterConfig[];

export function PurchaseSupplierFilter() {
  const { activeFilters, applyFilters } = useFilterSearchParams(config);
  return (
    <FilterPanel
      config={config}
      initialValue={activeFilters}
      onApplyFilter={applyFilters}
    />
  );
}
