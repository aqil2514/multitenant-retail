import { FilterConfig } from "@/_shared/filters/filter.config";
import { useFilterSearchParams } from "@/_shared/filters/filter.hooks";
import { FilterPanel } from "@/_shared/filters/panel";

const config = [
  { type: "text", key: "name", label: "Nama" },
  {
    type: "select",
    key: "status",
    label: "Status",
    options: [
      { value: "active", label: "Aktif" },
      { value: "inactive", label: "Tidak Aktif" },
    ],
  },
  {
    type: "select",
    key: "role",
    label: "Role",
    multiple: true,
    options: [
      { value: "admin", label: "Admin" },
      { value: "user", label: "User" },
    ],
  },
  {
    type: "number",
    key: "price",
    label: "Harga Modal",
  },
  {
    type: "date",
    key: "updated_at",
    label: "Terakhir Update",
  },
] satisfies FilterConfig[];

export function ProductListFilter() {
  const { activeFilters, applyFilters } = useFilterSearchParams(config);
  return (
    <FilterPanel
      config={config}
      initialValue={activeFilters}
      onApplyFilter={applyFilters}
    />
  );
}
