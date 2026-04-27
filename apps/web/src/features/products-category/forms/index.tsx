import { BaseFormComponentProps } from "@/_shared/forms/form.interface";
import {
  defaultProductCategory,
  ProductCategorySchemaInput,
  ProductCategorySchemaOutput,
  productsCategorySchema,
} from "./pc.schema";
import {
  BaseForm,
  FormFieldSelect,
  FormFieldText,
  FormFieldTextarea,
} from "@/_shared/forms";
import { useProductCategory } from "../pc.context";
import { useMemo } from "react";
import { LabelValue } from "@/@types/general";

export function ProductsCategoryForm({
  onSubmit,
  defaultValues,
}: BaseFormComponentProps<
  ProductCategorySchemaInput,
  ProductCategorySchemaOutput
>) {
  const { data } = useProductCategory();

  const options = useMemo<LabelValue<string>[]>(
    () =>
      data
        ? data.map((d) => ({
            label: d.name,
            value: d.id,
          }))
        : [],
    [data],
  );
  return (
    <BaseForm
      defaultValues={defaultValues ?? defaultProductCategory}
      schema={productsCategorySchema}
      onSubmit={onSubmit}
    >
      {(form) => (
        <div className="space-y-4">
          <FormFieldText
            form={form}
            name="name"
            label="Nama Kategori"
            placeholder="Misal: Minuman"
          />
          <FormFieldTextarea
            form={form}
            name="description"
            label="Deskripsi Kategori"
            placeholder="Misal: Minuman dingin rasa kalapa"
          />
          <FormFieldSelect
            form={form}
            label="Kategori Induk"
            name="parentId"
            options={options}
            placeholder="Pilih kategori induk"
          />
        </div>
      )}
    </BaseForm>
  );
}
