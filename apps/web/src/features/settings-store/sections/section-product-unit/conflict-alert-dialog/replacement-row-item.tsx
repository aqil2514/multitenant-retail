import { FormFieldSelect } from "@/_shared/forms";
import { Switch } from "@/components/ui/switch";
import {
  ConflictResolutionInput,
  ConflictResolutionOutput,
} from "@/features/settings-store/schemas/product-unit-conflict.schema";
import { Controller, UseFormReturn, useWatch } from "react-hook-form";

interface Props {
  form: UseFormReturn<
    ConflictResolutionInput,
    unknown,
    ConflictResolutionOutput
  >;
  index: number;
  productName?: string;
  currentUnit?: string;
  availableUnitOptions: { label: string; value: string }[];
}

export function ReplacementRowItem({
  form,
  index,
  productName,
  availableUnitOptions,
  currentUnit,
}: Props) {
  const action = useWatch({
    control: form.control,
    name: `replacements.${index}.action` as const,
    defaultValue: "replace",
  });
  const isDelete = action === "delete";

  return (
    <div className="grid grid-cols-[1fr_1fr_auto] gap-4 items-center">
      <div>
        <p className="text-sm font-medium truncate">{productName}</p>
        {currentUnit && (
          <p className="text-xs text-muted-foreground">
            Unit saat ini: <span className="font-medium">{currentUnit}</span>
          </p>
        )}
      </div>

      <FormFieldSelect
        form={form}
        name={`replacements.${index}.unitId` as never}
        label=""
        placeholder="Pilih unit"
        options={availableUnitOptions}
        disabled={isDelete}
      />

      <div className="flex items-center justify-center w-16">
        <Controller
          control={form.control}
          name={`replacements.${index}.action` as never}
          render={({ field: f }) => (
            <Switch
              checked={f.value === "delete"}
              onCheckedChange={(checked) => {
                f.onChange(checked ? "delete" : "replace");
                if (checked) {
                  form.setValue(
                    `replacements.${index}.unitId` as never,
                    "" as never,
                  );
                }
              }}
            />
          )}
        />
      </div>
    </div>
  );
}
