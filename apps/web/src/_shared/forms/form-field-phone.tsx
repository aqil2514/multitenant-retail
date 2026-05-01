import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { customList } from "country-codes-list";
import { BasicFormFieldProps } from "./form.interface";
import z from "zod";

export const phoneFieldSchema = z
  .string()
  .regex(/^\+\d{7,15}$/, "Format nomor tidak valid")
  .or(z.literal(""));

// ---------------------------------------------------------------------------
// Tipe & data negara
// ---------------------------------------------------------------------------

interface CountryEntry {
  code: string; // ISO 2-letter, e.g. "ID"
  dial: string; // calling code, e.g. "62"
  flag: string; // emoji, e.g. "🇮🇩"
}

function buildCountryList(): CountryEntry[] {
  const raw = customList(
    "countryCode",
    "{countryNameEn}|{countryCallingCode}|{flag}",
  ) as Record<string, string>;

  return Object.entries(raw)
    .map(([code, value]) => {
      const [, dial, flag] = value.split("|");
      return { code, dial, flag };
    })
    .filter((c) => c.dial && c.flag)
    .sort((a, b) => {
      if (a.code === "ID") return -1;
      if (b.code === "ID") return 1;
      return Number(a.dial) - Number(b.dial);
    });
}

const COUNTRY_LIST = buildCountryList();
const DEFAULT_COUNTRY =
  COUNTRY_LIST.find((c) => c.code === "ID") ?? COUNTRY_LIST[0];

// ---------------------------------------------------------------------------
// Helper nilai
// ---------------------------------------------------------------------------

/**
 * Pecah nilai E.164 (e.g. "+628123456789") menjadi { code, dial, local }.
 * Cocokkan dial code terpanjang lebih dulu untuk menghindari ambiguitas
 * (e.g. +1 US vs +1268 Antigua).
 */
function splitE164(
  value: string,
  countries: CountryEntry[],
): { code: string; dial: string; local: string } {
  if (!value.startsWith("+")) {
    return {
      code: DEFAULT_COUNTRY.code,
      dial: DEFAULT_COUNTRY.dial,
      local: value,
    };
  }

  const withoutPlus = value.slice(1);
  const sorted = [...countries].sort((a, b) => b.dial.length - a.dial.length);

  for (const c of sorted) {
    if (withoutPlus.startsWith(c.dial)) {
      return {
        code: c.code,
        dial: c.dial,
        local: withoutPlus.slice(c.dial.length),
      };
    }
  }

  return {
    code: DEFAULT_COUNTRY.code,
    dial: DEFAULT_COUNTRY.dial,
    local: withoutPlus,
  };
}

function toE164(dial: string, local: string): string {
  const cleaned = local.replace(/\D/g, "");
  if (!cleaned) return "";
  return `+${dial}${cleaned}`;
}

// ---------------------------------------------------------------------------
// Props & komponen
// ---------------------------------------------------------------------------

export type FormFieldPhoneProps<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
> = BasicFormFieldProps<T, TTransformedValues>;

export function FormFieldPhone<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
>({
  form,
  name,
  label,
  placeholder = "8123456789",
  className,
  disabled
}: FormFieldPhoneProps<T, TTransformedValues>) {
  const isSubmitting = form.formState.isSubmitting;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Simpan ISO code secara terpisah agar tidak ambigu saat dial code sama
  const [selectedCode, setSelectedCode] = useState(DEFAULT_COUNTRY.code);

  const filtered = useMemo(() => {
    if (!search) return COUNTRY_LIST;
    const q = search.toLowerCase();
    return COUNTRY_LIST.filter(
      (c) => c.dial.includes(q) || c.code.toLowerCase().includes(q),
    );
  }, [search]);

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => {
          const { code, local } = splitE164(
            field.value ?? "",
            COUNTRY_LIST,
          );

          // Sinkronisasi selectedCode saat field.value berubah dari luar
          // (e.g. saat defaultValues di-populate pada form edit)
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            if (code !== selectedCode) {
              setSelectedCode(code);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [field.value]);

          const selectedCountry =
            COUNTRY_LIST.find((c) => c.code === selectedCode) ??
            DEFAULT_COUNTRY;

          function handleDialChange(newDial: string, newCode: string) {
            field.onChange(toE164(newDial, local));
            setSelectedCode(newCode);
            setOpen(false);
            setSearch("");
          }

          function handleLocalChange(e: React.ChangeEvent<HTMLInputElement>) {
            const sanitized = e.target.value.replace(/\D/g, "");
            field.onChange(toE164(selectedCountry.dial, sanitized));
          }

          function handleBlur() {
            const trimmed = local.replace(/^0+/, "");
            field.onChange(toE164(selectedCountry.dial, trimmed));
            field.onBlur();
          }

          return (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

              <div className="flex gap-2">
                {/* Country code selector */}
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isSubmitting || disabled}
                      aria-label="Pilih kode negara"
                      className={cn(
                        "shrink-0 gap-1.5 px-3 font-normal",
                        "bg-slate-50 border-slate-200 text-slate-900",
                        "hover:bg-slate-50 hover:border-slate-300",
                        "focus-visible:ring-amber-500/20 focus-visible:border-amber-500",
                        "h-11 rounded-xl transition-all duration-200",
                        fieldState.invalid && "border-red-400",
                      )}
                    >
                      <span>{selectedCountry.flag}</span>
                      <span className="text-sm text-slate-600">
                        +{selectedCountry.dial}
                      </span>
                      <ChevronsUpDown size={14} className="text-slate-400" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent
                    className="w-52 p-0"
                    align="start"
                    side="bottom"
                    avoidCollisions={false} // ← tambahkan ini
                  >
                    <Command shouldFilter={false} className="h-full">
                      <CommandInput
                        placeholder="Cari kode..."
                        value={search}
                        onValueChange={setSearch}
                      />
                      <CommandList
                        className="h-[calc(100%-40px)] overflow-y-auto"
                        onWheel={(e) => e.stopPropagation()}
                      >
                        <CommandEmpty>Tidak ditemukan.</CommandEmpty>
                        <CommandGroup>
                          {filtered.map((c) => (
                            <CommandItem
                              key={c.code}
                              value={c.code}
                              onSelect={() => handleDialChange(c.dial, c.code)}
                              className="gap-2 cursor-pointer"
                            >
                              <span>{c.flag}</span>
                              <span className="text-sm">+{c.dial}</span>
                              <span className="ml-auto text-xs text-slate-400">
                                {c.code}
                              </span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {/* Input nomor lokal */}
                <Input
                  id={field.name}
                  type="tel"
                  inputMode="numeric"
                  maxLength={15}
                  disabled={isSubmitting || disabled}
                  aria-invalid={fieldState.invalid}
                  placeholder={placeholder}
                  value={local}
                  onChange={handleLocalChange}
                  onBlur={handleBlur}
                  className={cn(
                    "bg-slate-50 border-slate-200 text-slate-900",
                    "placeholder:text-slate-400",
                    "focus-visible:ring-amber-500/20 focus-visible:border-amber-500",
                    "h-11 rounded-xl transition-all duration-200",
                    "hover:border-slate-300",
                    className,
                  )}
                />
              </div>

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />
    </FieldGroup>
  );
}
