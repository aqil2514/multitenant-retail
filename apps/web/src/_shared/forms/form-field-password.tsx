import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { BasicFormFieldProps } from "./form.interface";

export interface FormFieldPasswordProps<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
> extends BasicFormFieldProps<T, TTransformedValues> {
  // Tampilkan indikator kekuatan password
  showStrength?: boolean;
}

type StrengthLevel = "weak" | "medium" | "strong" | "very-strong";

function getStrength(password: string): StrengthLevel | null {
  if (!password) return null;
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return "weak";
  if (score === 2) return "medium";
  if (score === 3) return "strong";
  return "very-strong";
}

function getStrengthConfig(strengthLevel: StrengthLevel): { label: string; color: string; bars: number } {
  const strengthLabels: Record<StrengthLevel, string> = {
    weak: "Lemah",
    medium: "Sedang",
    strong: "Kuat",
    "very-strong": "Sangat kuat",
  };

  const strengthColors: Record<StrengthLevel, { color: string; bars: number }> = {
    weak: { color: "bg-red-400", bars: 1 },
    medium: { color: "bg-amber-400", bars: 2 },
    strong: { color: "bg-lime-500", bars: 3 },
    "very-strong": { color: "bg-green-500", bars: 4 },
  };

  return {
    label: strengthLabels[strengthLevel],
    ...strengthColors[strengthLevel],
  };
}

export function FormFieldPassword<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
>({
  form,
  name,
  label,
  placeholder = "••••••••",
  showStrength = false,
  className,
  disabled
}: FormFieldPasswordProps<T, TTransformedValues>) {
  const [visible, setVisible] = useState(false);
  const isSubmitting = form.formState.isSubmitting;

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => {
          const strength = showStrength ? getStrength(field.value ?? "") : null;
          const config = strength ? getStrengthConfig(strength) : null;

          return (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

              <div className="relative">
                <Input
                  {...field}
                  id={field.name}
                  type={visible ? "text" : "password"}
                  disabled={isSubmitting || disabled}
                  aria-invalid={fieldState.invalid}
                  placeholder={placeholder}
                  className={cn(
                    "bg-slate-50 border-slate-200 text-slate-900",
                    "placeholder:text-slate-400",
                    "focus-visible:ring-amber-500/20 focus-visible:border-amber-500",
                    "h-11 rounded-xl transition-all duration-200 pr-11",
                    "hover:border-slate-300",
                    className,
                  )}
                />
                <button
                  type="button"
                  disabled={isSubmitting || disabled}
                  onClick={() => setVisible((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 disabled:opacity-50 transition-colors"
                  aria-label={visible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                >
                  {visible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Indikator kekuatan password */}
              {showStrength && field.value && config && (
                <div className="space-y-1 mt-1">
                  <div className="flex gap-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-1 flex-1 rounded-full transition-all duration-300",
                          i < config.bars ? config.color : "bg-slate-200",
                        )}
                      />
                    ))}
                  </div>
                  <p className={cn("text-xs", config.color.replace("bg-", "text-"))}>
                    {config.label}
                  </p>
                </div>
              )}

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />
    </FieldGroup>
  );
}