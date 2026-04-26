import { LabelValue } from "@/@types/general";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Controller, FieldValues } from "react-hook-form";
import { BasicFormFieldProps } from "./form.interface";

export interface FormFieldTextProps<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
> extends BasicFormFieldProps<T, TTransformedValues> {
  datalist?: LabelValue[];
}

export function FormFieldText<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
>({
  form,
  name,
  label,
  placeholder,
  datalist,
  className,
}: FormFieldTextProps<T, TTransformedValues>) {
  const isSubmitting = form.formState.isSubmitting;
  const defaultPlaceholder = placeholder ?? "Masukkan teks...";

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => {
          const datalistId = datalist ? `${field.name}-list` : undefined;

          return (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
              <Input
                {...field}
                id={field.name}
                disabled={isSubmitting}
                aria-invalid={fieldState.invalid}
                placeholder={defaultPlaceholder}
                list={datalistId}
                className={cn(
                  // 1. Background & Text: Gunakan warna terang yang soft
                  "bg-slate-50 border-slate-200 text-slate-900",

                  // 2. Placeholder: Berikan kontras yang cukup tapi tidak mati
                  "placeholder:text-slate-400",

                  // 3. Focus State: Gunakan Amber untuk identitas brand Anda
                  "focus-visible:ring-amber-500/20 focus-visible:border-amber-500",

                  // 4. Sizing & Shape
                  "h-11 rounded-xl transition-all duration-200",

                  // 5. Hover Effect: Agar interaktif
                  "hover:border-slate-300",

                  className,
                )}
              />
              {datalist && (
                <datalist id={datalistId}>
                  {datalist.map((item) => (
                    <option
                      key={item.value}
                      value={item.value}
                      label={item.label}
                    />
                  ))}
                </datalist>
              )}
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />
    </FieldGroup>
  );
}
