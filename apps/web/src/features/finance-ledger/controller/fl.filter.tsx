import { FilterConfig } from "@/_shared/filters/filter.config";
import { useFilterSearchParams } from "@/_shared/filters/filter.hooks";
import { FilterPanel } from "@/_shared/filters/panel";

const config = [
  {
    type: "date",
    key: "date",
    label: "Tanggal",
  },
  {
    type: "text",
    key: "description",
    label: "Keterangan",
  },
  {
    type: "text",
    key: "reference",
    label: "Referensi",
  },
] satisfies FilterConfig[];

export function FinanceLedgerFilter() {
  const { activeFilters, applyFilters } = useFilterSearchParams(config);
  return (
    <FilterPanel
      config={config}
      initialValue={activeFilters}
      onApplyFilter={applyFilters}
    />
  );
}
