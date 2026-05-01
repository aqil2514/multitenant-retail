import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, isValid, parse } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Controller, FieldValues } from "react-hook-form";
import { BasicFormFieldProps } from "./form.interface";

export interface FormFieldDateProps<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
> extends BasicFormFieldProps<T, TTransformedValues> {
  // Format yang disimpan ke form value. Default: "yyyy-MM-dd" (ISO, aman untuk API)
  valueFormat?: string;
  // Format yang ditampilkan ke user. Default: "dd MMMM yyyy" (e.g. "24 April 2026")
  displayFormat?: string;
  fromYear?: number;
  toYear?: number;
}

export function FormFieldDate<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
>({
  form,
  name,
  label,
  placeholder = "Pilih Tanggal",
  valueFormat = "yyyy-MM-dd",
  displayFormat = "dd MMMM yyyy",
  fromYear = 1900,
  toYear = new Date().getFullYear() + 5,
  className,
  disabled
}: FormFieldDateProps<T, TTransformedValues>) {
  const isSubmitting = form.formState.isSubmitting;

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => {
          const dateValue: Date | undefined = (() => {
            const value = field.value as unknown;
            if (!value) return undefined;
            if (value instanceof Date) return value;
            if (typeof value !== "string") return undefined;
            const parsed = parse(value, valueFormat, new Date());
            return isValid(parsed) ? parsed : undefined;
          })();

          return (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id={field.name}
                    type="button"
                    variant="outline"
                    disabled={isSubmitting || disabled}
                    aria-invalid={fieldState.invalid}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      "bg-slate-50 border-slate-200",
                      "hover:bg-slate-50 hover:border-slate-300",
                      "focus-visible:ring-amber-500/20 focus-visible:border-amber-500",
                      "h-11 rounded-xl transition-all duration-200",
                      !dateValue && "text-slate-400",
                      fieldState.invalid && "border-red-400",
                      className,
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 shrink-0 text-slate-400" />
                    {dateValue
                      ? format(dateValue, displayFormat, { locale: id })
                      : placeholder}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateValue}
                    onSelect={(date) => {
                      // Simpan sebagai string ISO ke RHF, bukan Date object
                      field.onChange(date ? format(date, valueFormat) : null);
                    }}
                    captionLayout="dropdown"
                    fromYear={fromYear}
                    toYear={toYear}
                    initialFocus
                    locale={id}
                  />
                </PopoverContent>
              </Popover>

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />
    </FieldGroup>
  );
}
