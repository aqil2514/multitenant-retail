import {
  Field,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Controller, FieldValues } from "react-hook-form";
import { BasicFormFieldProps } from "./form.interface";

export interface FormFieldSwitchProps<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
> extends BasicFormFieldProps<T, TTransformedValues> {
  // Teks deskripsi opsional di bawah label
  description?: string;
}

export function FormFieldSwitch<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
>({
  form,
  name,
  label,
  description,
  className,
  disabled
}: FormFieldSwitchProps<T, TTransformedValues>) {
  const isSubmitting = form.formState.isSubmitting;

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            {/* Layout horizontal: teks di kiri, switch di kanan */}
            <div
              className={cn(
                "flex items-center justify-between gap-4 rounded-xl px-4 py-3",
                "bg-slate-50 border border-slate-200",
                "hover:border-slate-300 transition-all duration-200",
                fieldState.invalid && "border-red-400",
                className,
              )}
            >
              <div className="space-y-0.5">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-slate-700 cursor-pointer"
                >
                  {label}
                </label>
                {description && (
                  <p className="text-xs text-slate-400">{description}</p>
                )}
              </div>
              <Switch
                id={field.name}
                checked={!!field.value}
                onCheckedChange={field.onChange}
                disabled={isSubmitting || disabled}
                className="data-[state=checked]:bg-amber-500"
              />
            </div>

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}