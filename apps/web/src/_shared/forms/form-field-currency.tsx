import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { Controller, FieldValues } from "react-hook-form";
import CurrencyInput from "react-currency-input-field";
import { BasicFormFieldProps } from "./form.interface";

export interface FormFieldCurrencyProps<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
> extends BasicFormFieldProps<T, TTransformedValues> {
  prefix?: string;
  decimalsLimit?: number;
  groupSeparator?: string;
  decimalSeparator?: string;
}

export function FormFieldCurrency<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
>({
  form,
  name,
  label,
  placeholder,
  className,
  disabled,
  prefix = "Rp ",
  decimalsLimit = 0,
  groupSeparator = ".",
  decimalSeparator = ",",
}: FormFieldCurrencyProps<T, TTransformedValues>) {
  const isSubmitting = form.formState.isSubmitting;
  const defaultPlaceholder = placeholder ?? "Masukkan nominal...";

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <CurrencyInput
              id={field.name}
              name={field.name}
              value={field.value ?? ""}
              onValueChange={(value) => {
                field.onChange(value ? parseFloat(value) : null);
              }}
              onBlur={field.onBlur}
              disabled={isSubmitting || disabled}
              aria-invalid={fieldState.invalid}
              placeholder={defaultPlaceholder}
              prefix={prefix}
              decimalsLimit={decimalsLimit}
              groupSeparator={groupSeparator}
              decimalSeparator={decimalSeparator}
              className={cn(
                "flex w-full",
                "bg-slate-50 border border-slate-200 text-slate-900",
                "placeholder:text-slate-400",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/20 focus-visible:border-amber-500",
                "h-11 rounded-xl transition-all duration-200 px-3",
                "hover:border-slate-300",
                "disabled:cursor-not-allowed disabled:opacity-50",
                className,
              )}
            />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
