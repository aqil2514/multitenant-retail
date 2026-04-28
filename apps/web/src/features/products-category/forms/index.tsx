import { BaseFormComponentProps } from "@/_shared/forms/form.interface";
import {
  defaultProductCategory,
  ProductCategorySchemaInput,
  ProductCategorySchemaOutput,
  productsCategorySchema,
} from "./pc.schema";
import { BaseForm, FormFieldText, FormFieldTextarea } from "@/_shared/forms";
import { ParentSelectField } from "./parent-select";

export function ProductsCategoryForm({
  onSubmit,
  defaultValues,
}: BaseFormComponentProps<
  ProductCategorySchemaInput,
  ProductCategorySchemaOutput
>) {
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
          <ParentSelectField form={form} />
        </div>
      )}
    </BaseForm>
  );
}
