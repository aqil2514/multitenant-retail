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

export interface FormFieldNumberProps<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
> extends BasicFormFieldProps<T, TTransformedValues> {
  min?: number;
  max?: number;
  step?: number;
  prefix?: string; // e.g. "Rp"
  suffix?: string; // e.g. "kg"
}

export function FormFieldNumber<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
>({
  form,
  name,
  label,
  placeholder = "0",
  min,
  max,
  step = 1,
  prefix,
  suffix,
  className,
  disabled
}: FormFieldNumberProps<T, TTransformedValues>) {
  const isSubmitting = form.formState.isSubmitting;

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

            <div className="relative flex items-center">
              {prefix && (
                <span className="absolute left-3 text-sm text-slate-500 select-none pointer-events-none">
                  {prefix}
                </span>
              )}
              <Input
                id={field.name}
                type="number"
                disabled={isSubmitting || disabled}
                aria-invalid={fieldState.invalid}
                placeholder={placeholder}
                min={min}
                max={max}
                step={step}
                value={field.value ?? ""}
                onChange={(e) => {
                  const raw = e.target.value;
                  // Kirim sebagai number ke RHF, bukan string
                  field.onChange(raw === "" ? null : Number(raw));
                }}
                onBlur={field.onBlur}
                className={cn(
                  "bg-slate-50 border-slate-200 text-slate-900",
                  "placeholder:text-slate-400",
                  "focus-visible:ring-amber-500/20 focus-visible:border-amber-500",
                  "h-11 rounded-xl transition-all duration-200",
                  "hover:border-slate-300",
                  // Hapus spinner bawaan browser
                  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                  prefix && "pl-9",
                  suffix && "pr-9",
                  className,
                )}
              />
              {suffix && (
                <span className="absolute right-3 text-sm text-slate-500 select-none pointer-events-none">
                  {suffix}
                </span>
              )}
            </div>

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}