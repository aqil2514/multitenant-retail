import { UseFormReturn } from "react-hook-form";
import {
  ProductCategorySchemaInput,
  ProductCategorySchemaOutput,
} from "./pc.schema";
import { FormFieldSelect } from "@/_shared/forms";
import { useProductCategory } from "../pc.context";
import { useMemo } from "react";
import { LabelValue } from "@/@types/general";
import { useQueryState } from "@/_shared/hooks/use-query-state";

interface Props {
  form: UseFormReturn<
    ProductCategorySchemaInput,
    unknown,
    ProductCategorySchemaOutput
  >;
}

export function ParentSelectField({ form }: Props) {
  const { data } = useProductCategory();
  const { get } = useQueryState();
  const idKey = get("idKey");

  const options = useMemo<LabelValue<string>[]>(
    () =>
      data
        ? [
            {
              label: "Tidak ada kategori induk",
              value: "no-parent",
            },
            ...data
              .filter((d) => d.id !== idKey)
              .map((d) => ({
                label: d.name,
                value: d.id,
              })),
          ]
        : [],
    [data, idKey],
  );

  return (
    <FormFieldSelect
      form={form}
      label="Kategori Induk"
      name="parentId"
      options={options}
      placeholder="Pilih kategori induk"
    />
  );
}
