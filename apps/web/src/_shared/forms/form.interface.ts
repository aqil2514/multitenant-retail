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

export interface BaseFormComponentProps<TInput, TOutput = TInput> {
  defaultValues?: TInput;
  onSubmit: (values: TOutput) => Promise<void> | void;
}
