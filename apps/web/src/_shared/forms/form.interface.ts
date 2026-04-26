import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface BasicFormFieldProps<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
> {
  form: UseFormReturn<T, unknown, TTransformedValues>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  className?: string;
}

export interface BaseFormComponentProps<T> {
  defaultValues?: T;
  onSubmit: (values: T) => Promise<void> | void;
}
