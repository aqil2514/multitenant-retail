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
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldArray,
  FieldValues,
  UseFormReturn,
  useFieldArray,
} from "react-hook-form";
import React from "react";

type ArrayItem<T extends FieldValues, TName extends ArrayPath<T>> = FieldArray<
  T,
  TName
>;

interface ColumnDef<
  T extends FieldValues,
  TName extends ArrayPath<T>,
  TItem extends ArrayItem<T, TName> = ArrayItem<T, TName>,
> {
  key: Extract<keyof TItem, string>;
  label: string;
  placeholder?: string;
  width?: string;
  render?: (props: {
    field: ControllerRenderProps<T, never>;
    fieldState: ControllerFieldState;
    index: number;
    disabled: boolean;
  }) => React.ReactElement;
}

const DEFAULT_COLUMN_WIDTH = "minmax(0,1fr)";

export interface FormFieldArrayProps<
  T extends FieldValues,
  TName extends ArrayPath<T>,
  TTransformedValues extends FieldValues = T,
> {
  form: UseFormReturn<T, unknown, TTransformedValues>;
  name: TName;
  label: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  columns: ColumnDef<T, TName>[];
  defaultItem: ArrayItem<T, TName>;
  addLabel?: string;
}

export function FormFieldArray<
  T extends FieldValues,
  TName extends ArrayPath<T>,
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
}: FormFieldArrayProps<T, TName, TTransformedValues>) {
  const { fields, append, remove } = useFieldArray<T, TName>({
    control: form.control as unknown as Control<T>,
    name,
  });

  const isSubmitting = form.formState.isSubmitting;
  const isDisabled = isSubmitting || !!disabled;
  const fieldError = form.formState.errors[name as keyof typeof form.formState.errors];

  const gridColsStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `${columns
      .map((column) => column.width ?? DEFAULT_COLUMN_WIDTH)
      .join(" ")} auto`,
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
                  render={({ field: f, fieldState }) => {
                    if (col.render) {
                      return col.render({
                        field: f,
                        fieldState,
                        index,
                        disabled: isDisabled,
                      });
                    }

                    return (
                      <Input
                        {...f}
                        value={f.value ?? ""}
                        placeholder={col.placeholder}
                        disabled={isDisabled}
                        data-invalid={fieldState.invalid}
                      />
                    );
                  }}
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

          {fieldError && <FieldError errors={[fieldError as never]} />}

          {!isDisabled && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append(defaultItem)}
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
