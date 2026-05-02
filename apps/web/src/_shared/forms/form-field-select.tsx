import { LabelValue } from "@/@types/general";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Controller, FieldValues } from "react-hook-form";
import { BasicFormFieldProps } from "./form.interface";
import { Loader2, Plus } from "lucide-react"; // Tambahkan icon loader

export interface FormFieldSelectProps<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
> extends BasicFormFieldProps<T, TTransformedValues> {
  options: LabelValue[];
  isLoading?: boolean;
  addNewOption?: boolean;
  addNewLabel?: string;
}

export function FormFieldSelect<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
>({
  form,
  name,
  label,
  placeholder,
  options,
  className,
  isLoading,
  addNewLabel,
  addNewOption,
  disabled
}: FormFieldSelectProps<T, TTransformedValues>) {
  const isSubmitting = form.formState.isSubmitting;

  // Pastikan placeholder tidak null/undefined
  const defaultPlaceholder = placeholder ?? "Pilih salah satu";

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="w-full">
            {label && (
              <FieldLabel htmlFor={field.name} className="mb-2 block">
                {label}
              </FieldLabel>
            )}

            <Select
              // Gunakan undefined jika value kosong agar placeholder muncul
              value={!field.value ? undefined : String(field.value)}
              onValueChange={field.onChange}
              disabled={isSubmitting || isLoading || disabled}
            >
              <SelectTrigger
                id={field.name}
                className={cn(
                  "flex h-11 w-full items-center justify-between rounded-xl border bg-zinc-50/50 px-4 py-2 text-sm transition-all duration-200",
                  "border-zinc-200 hover:border-zinc-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  fieldState.invalid &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500/10",
                  !field.value && "text-zinc-400", // Warna placeholder
                  field.value && "text-zinc-900", // Warna saat ada value
                  className,
                )}
              >
                <div className="flex items-center gap-2 truncate">
                  {isLoading && (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-400" />
                  )}
                  <SelectValue
                    placeholder={
                      isLoading ? "Memuat..." : defaultPlaceholder
                    }
                  />
                </div>
              </SelectTrigger>

              <SelectContent className="rounded-xl border-zinc-200 shadow-lg">
                {options.length > 0 ? (
                  options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={String(option.value)}
                      className="rounded-lg focus:bg-amber-50 focus:text-amber-900 cursor-pointer"
                    >
                      {option.label}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-zinc-400">
                    Tidak ada opsi tersedia
                  </div>
                )}

                {addNewOption && (
                  <>
                    <SelectSeparator />
                    <SelectItem value="__add_new__" className="text-amber-600">
                      <div className="flex items-center gap-2">
                        <Plus className="h-3.5 w-3.5" />
                        {addNewLabel ?? "Tambah baru"}
                      </div>
                    </SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>

            {fieldState.error && (
              <div className="mt-1.5">
                <FieldError errors={[fieldState.error]} />
              </div>
            )}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
