import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import {
  ArrayPath,
  Controller,
  FieldValues,
  useFieldArray,
} from "react-hook-form";
import { BasicFormFieldProps } from "./form.interface";
import React from "react";

interface ColumnDef {
  key: string;
  label: string;
  placeholder?: string;
}

export type FormFieldArrayProps<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
> = Omit<BasicFormFieldProps<T, TTransformedValues>, "name"> & {
  name: ArrayPath<T>;
  columns: ColumnDef[];
  defaultItem: Record<string, string>;
  addLabel?: string;
};

export function FormFieldArray<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
>({
  form,
  name,
  label,
  disabled,
  className,
  columns,
  defaultItem,
  addLabel = "Tambah",
}: FormFieldArrayProps<T, TTransformedValues>) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: name as never,
  });

  const isSubmitting = form.formState.isSubmitting;
  const isDisabled = isSubmitting || disabled;

  const gridColsStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `${columns.map(() => "1fr").join(" ")} auto`,
    gap: "0.5rem",
  };

  return (
    <FieldGroup>
      <Field>
        <FieldLabel>{label}</FieldLabel>

        <div className={cn("space-y-2", className)}>
          {fields.length > 0 && (
            <div className={cn("grid gap-2 px-1")} style={gridColsStyle}>
              {columns.map((col) => (
                <span key={col.key} className="text-xs text-muted-foreground">
                  {col.label}
                </span>
              ))}
              <span className="w-8" />
            </div>
          )}

          {fields.map((field, index) => (
            <div
              key={field.id}
              style={gridColsStyle}
              className={cn("grid gap-2 items-center")}
            >
              {columns.map((col) => (
                <Controller
                  key={col.key}
                  control={form.control}
                  name={`${name}.${index}.${col.key}` as never}
                  render={({ field: f, fieldState }) => (
                    <Input
                      {...f}
                      value={f.value ?? ""}
                      placeholder={col.placeholder}
                      disabled={isDisabled}
                      data-invalid={fieldState.invalid}
                    />
                  )}
                />
              ))}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={isDisabled}
                onClick={() => remove(index)}
                aria-label={`Hapus baris ke-${index + 1}`}
                className="h-9 w-9 text-muted-foreground hover:text-destructive"
              >
                <X size={14} />
              </Button>
            </div>
          ))}

          {form.formState.errors[name] && (
            <FieldError errors={[form.formState.errors[name] as never]} />
          )}

          {!isDisabled && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append(defaultItem as never)}
              className="gap-1.5"
            >
              <Plus size={14} />
              {addLabel}
            </Button>
          )}
        </div>
      </Field>
    </FieldGroup>
  );
}
