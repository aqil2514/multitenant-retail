import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Controller, FieldValues } from "react-hook-form";
import { BasicFormFieldProps } from "./form.interface";

export interface FormFieldTextareaProps<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
> extends BasicFormFieldProps<T, TTransformedValues> {
  rows?: number;
}

export function FormFieldTextarea<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
>({
  form,
  name,
  label,
  placeholder,
  rows = 3,
  className,
}: FormFieldTextareaProps<T, TTransformedValues>) {
  const isSubmitting = form.formState.isSubmitting;
  const defaultPlaceholder = placeholder ?? "Masukkan teks...";

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Textarea
              {...field}
              id={field.name}
              disabled={isSubmitting}
              aria-invalid={fieldState.invalid}
              placeholder={defaultPlaceholder}
              rows={rows}
              className={cn(
                "bg-slate-50 border-slate-200 text-slate-900",
                "placeholder:text-slate-400",
                "focus-visible:ring-amber-500/20 focus-visible:border-amber-500",
                "rounded-xl transition-all duration-200 resize-none",
                "hover:border-slate-300",
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
