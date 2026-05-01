import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { KeyboardEvent, useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { BasicFormFieldProps } from "./form.interface";

// Tidak butuh placeholder dari BasicFormFieldProps — di-override sendiri
export type FormFieldTagsProps<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
> = BasicFormFieldProps<T, TTransformedValues>;

export function FormFieldTags<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
>({
  form,
  name,
  label,
  placeholder,
  className,
  disabled
}: FormFieldTagsProps<T, TTransformedValues>) {
  const [inputValue, setInputValue] = useState("");
  const isSubmitting = form.formState.isSubmitting;
  const defaultPlaceholder = placeholder ?? "Tambahkan tag";

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => {
          const tags: string[] = Array.isArray(field.value) ? field.value : [];

          function addTag(raw: string) {
            const tag = raw.trim();
            if (tag && !tags.includes(tag)) {
              field.onChange([...tags, tag]);
            }
            setInputValue("");
          }

          function removeTag(tag: string) {
            field.onChange(tags.filter((t) => t !== tag));
          }

          function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addTag(inputValue);
            } else if (
              e.key === "Backspace" &&
              !inputValue &&
              tags.length > 0
            ) {
              removeTag(tags[tags.length - 1]);
            }
          }

          return (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

              {/* Wrapper yang meniru tampilan Input */}
              <div
                className={cn(
                  "flex flex-wrap gap-1.5 items-center min-h-11 w-full px-3 py-2",
                  "bg-slate-50 border border-slate-200 rounded-xl",
                  "transition-all duration-200",
                  "hover:border-slate-300",
                  "focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:border-amber-500",
                  fieldState.invalid && "border-red-400",
                  className,
                )}
              >
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-sm font-medium"
                  >
                    {tag}
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => removeTag(tag)}
                      className="text-amber-600 hover:text-amber-900 disabled:opacity-50"
                      aria-label={`Hapus tag ${tag}`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}

                <Input
                  id={field.name}
                  value={inputValue}
                  disabled={isSubmitting || disabled}
                  placeholder={tags.length === 0 ? defaultPlaceholder : ""}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={() => {
                    if (inputValue.trim()) addTag(inputValue);
                    field.onBlur();
                  }}
                  // Reset styling bawaan Input — sudah ditangani oleh wrapper
                  className="flex-1 min-w-24 border-none bg-transparent p-0 h-auto shadow-none focus-visible:ring-0 text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <p className="text-xs text-slate-400">
                Tekan <kbd className="px-1 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-xs">Enter</kbd> atau <kbd className="px-1 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-xs">,</kbd> untuk menambahkan tag.
              </p>

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />
    </FieldGroup>
  );
}
