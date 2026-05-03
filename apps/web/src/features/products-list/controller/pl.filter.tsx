import { FilterPanel } from "@/_shared/filters/panel";

export function ProductListFilter() {
  return (
    <FilterPanel
      config={[
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
      ]}
      initialValue={[]}
      onApplyFilter={(filters) => console.log(filters)}
    />
  );
}