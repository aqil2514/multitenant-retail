import { BaseFormComponentProps } from "@/_shared/forms/form.interface";
import {
  defaultProductList,
  ProductListInput,
  ProductListOutput,
  productsListSchema,
} from "./pl.schema";
import {
  BaseForm,
  FormFieldNumber,
  FormFieldText,
  FormFieldTextarea,
} from "@/_shared/forms";
import { FormFieldImage } from "@/_shared/forms/form-field-image";
import { ProductSelectField } from "./product-select.field";

export function ProductListForm({
  defaultValues,
  onSubmit,
}: BaseFormComponentProps<ProductListInput, ProductListOutput>) {
  return (
    <BaseForm
      defaultValues={defaultValues ?? defaultProductList}
      onSubmit={onSubmit}
      schema={productsListSchema}
    >
      {(form) => (
        <div className="space-y-4">
          <FormFieldImage form={form} label="Gambar Produk" name="image" />
          <FormFieldText form={form} name="name" label="Nama Produk" />
          <FormFieldText
            form={form}
            name="sku"
            label="SKU (Stock Keeping Unit)"
          />
          <ProductSelectField form={form} name="categoryId" />
          <FormFieldTextarea
            form={form}
            name="description"
            label="Deskripsi Produk"
          />
          <FormFieldNumber form={form} name="stock" label="Stok Terkini" />
          <FormFieldNumber form={form} name="minStock" label="Stok Minimal" />
          <ProductSelectField form={form} name="unit" />
        </div>
      )}
    </BaseForm>
  );
}
