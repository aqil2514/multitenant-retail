import { DataBadge } from "@/_shared/data-display/data-badge";
import { useStoreSettings } from "../../ss.context";
import { BaseForm } from "@/_shared/forms";
import {
  productUnitSchema,
  ProductUnitSchemaInput,
} from "../../schemas/product-unit.schema";
import { FormFieldArray } from "@/_shared/forms/form-field-array";
import { useMemo } from "react";
import { useFormEditSubmit } from "@/_shared/hooks/use-form-edit-submit";
import { ProductUnitsConflictData } from "../../interface/ss-product-units";
import { useSectionProduct } from "./context";

export function ProductUnitForm() {
  const { isEditing, setIsEditing, setConflictData } = useSectionProduct();
  const { data, refetch } = useStoreSettings();

  const defaultValues = useMemo<ProductUnitSchemaInput | undefined>(() => {
    if (!data) return undefined;

    const unit = data.productUnits.map((d) => ({
      name: d.name,
      value: d.value,
      id: d.id,
    }));

    return { unit };
  }, [data]);

  // Tangani dulu errornya kalo ada product yang pakek product unit ini
  const { submit } = useFormEditSubmit<{
    success: boolean;
    newSlugUrl: string | null;
  }>({
    endpoint: "settings/store/product-unit",
    onSuccess() {
      refetch();
      setIsEditing(false);
    },
    onError(error) {
      const data = error.response?.data as ProductUnitsConflictData;
      setConflictData(data);
    },
  });

  if (!isEditing || !defaultValues) return <NoEditingData />;

  return (
    <BaseForm
      schema={productUnitSchema}
      defaultValues={defaultValues}
      onSubmit={submit}
    >
      {(form) => (
        <div className="space-y-4">
          <FormFieldArray
            form={form}
            name="unit"
            label="Satuan Unit"
            columns={[
              { key: "name", label: "Nama", placeholder: "Kilogram" },
              { key: "value", label: "Value", placeholder: "Kg" },
            ]}
            defaultItem={{ name: "", value: "" }}
          />
        </div>
      )}
    </BaseForm>
  );
}

const NoEditingData = () => {
  const { data } = useStoreSettings();

  return (
    <div className="flex flex-wrap gap-3">
      {data?.productUnits.map((unit) => (
        <DataBadge key={unit.id} value={unit.value} label={unit.name} />
      ))}
      {data?.productUnits.length === 0 && (
        <p className="text-sm text-muted-foreground italic">
          Belum ada unit produk yang ditambahkan.
        </p>
      )}
    </div>
  );
};
