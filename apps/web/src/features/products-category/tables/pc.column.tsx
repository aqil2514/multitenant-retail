import { Edit, Trash } from "lucide-react";
import { BasicProductsCategory } from "../interfaces/pc.interface";
import { createActionColumn } from "@/_shared/tables/action-column";
import { useQueryState } from "@/_shared/hooks/use-query-state";

export function useProductsCategoryColumns() {
  const { update } = useQueryState();

  const columns = createActionColumn<BasicProductsCategory>({
    columns: [
      {
        accessorKey: "name",
        header: "Nama Kategori",
      },
    ],
    getMenuItems: ({ id }) => [
      {
        label: "Edit",
        icon: Edit,
        onClick: () => update({ dialog: "edit", idKey: id }),
        variant: "info",
      },
      {
        label: "Hapus",
        icon: Trash,
        onClick: () => update({ dialog: "delete", idKey: id }),
        variant: "danger",
      },
    ],
    dropdownLabel: ({ name }) => `${name}`,
    position: "start",
    actionAlignment: "left",
  });

  return columns;
}
