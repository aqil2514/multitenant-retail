import { useFieldArray, UseFormReturn } from "react-hook-form";
import { ReplacementRowItem } from "./replacement-row-item";
import {
  ConflictResolutionInput,
  ConflictResolutionOutput,
} from "@/features/settings-store/schemas/product-unit-conflict.schema";
import { ProductUnitsConflictData } from "@/features/settings-store/interface/ss-product-units";

interface Props {
  form: UseFormReturn<
    ConflictResolutionInput,
    unknown,
    ConflictResolutionOutput
  >;
  conflictData: ProductUnitsConflictData;
}

export function ReplacementRow({ form, conflictData }: Props) {
  const { fields } = useFieldArray({
    control: form.control,
    name: "replacements",
  });

  const availableUnitOptions = conflictData.availableUnits.map((u) => ({
    label: u.name,
    value: u.id!,
  }));

  return (
    <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
      {fields.map((field, index) => {
        const product = conflictData.affectedProducts.find(
          (p) => p.id === field.productId,
        );

        return (
          <ReplacementRowItem
            key={field.id}
            form={form}
            index={index}
            currentUnit={product?.unit.name}
            productName={product?.name}
            availableUnitOptions={availableUnitOptions}
          />
        );
      })}
    </div>
  );
}
