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
  FormFieldSelect,
  FormFieldText,
  FormFieldTextarea,
} from "@/_shared/forms";
import { FormFieldImage } from "@/_shared/forms/form-field-image";
import { ProductSelectField } from "./product-select.field";
import { FormFieldCurrency } from "@/_shared/forms/form-field-currency";
import { useWatch, UseFormReturn } from "react-hook-form";

const PRODUCT_TYPE_OPTIONS = [
  { label: "Fisik", value: "PHYSICAL" },
  { label: "Digital", value: "DIGITAL" },
];

function ProductListFormFields({
  form,
}: {
  form: UseFormReturn<ProductListInput, unknown, ProductListOutput>;
}) {
  const type = useWatch({ control: form.control, name: "type" });
  const isDigital = type === "DIGITAL";

  return (
    <div className="space-y-4">
      <FormFieldImage form={form} label="Gambar Produk" name="image" />
      <FormFieldText form={form} name="name" label="Nama Produk" />
      <FormFieldSelect
        form={form}
        name="type"
        label="Tipe Produk"
        options={PRODUCT_TYPE_OPTIONS}
        placeholder="Pilih Tipe Produk"
      />
      <FormFieldText form={form} name="sku" label="SKU (Stock Keeping Unit)" />
      <ProductSelectField form={form} name="categoryId" />
      <ProductSelectField form={form} name="unitId" />
      <FormFieldTextarea
        form={form}
        name="description"
        label="Deskripsi Produk"
      />
      <FormFieldCurrency form={form} name="baseCostPrice" label="Harga Modal" />
      <FormFieldCurrency
        form={form}
        name="baseSellingPrice"
        label="Harga Jual"
      />
      {!isDigital && (
        <>
          <FormFieldNumber form={form} name="stock" label="Stok Terkini" />
          <FormFieldNumber form={form} name="minStock" label="Stok Minimal" />
        </>
      )}
    </div>
  );
}

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
      {(form) => <ProductListFormFields form={form} />}
    </BaseForm>
  );
}
