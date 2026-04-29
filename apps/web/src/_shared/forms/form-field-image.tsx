/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { BasicFormFieldProps } from "./form.interface";

import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const imageFieldSchema = z
  .union([z.instanceof(File, { message: "Gambar wajib diupload" }), z.string()])
  .refine(
    (file) => {
      if (file instanceof File) return file.size <= MAX_FILE_SIZE;
      return true; // Jika string (URL), abaikan pengecekan ukuran
    },
    { message: "Ukuran gambar maksimal 5MB" },
  )
  .refine(
    (file) => {
      if (file instanceof File) return ACCEPTED_IMAGE_TYPES.includes(file.type);
      return true; // Jika string (URL), abaikan pengecekan tipe
    },
    { message: "Format gambar harus PNG, JPG, atau WEBP" },
  );

export const imageFieldSchemaNullish = imageFieldSchema.nullish();

export function FormFieldImage<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
>({
  form,
  name,
  label,
  className,
}: Omit<BasicFormFieldProps<T, TTransformedValues>, "placeholder">) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Sync initial value (untuk Edit mode)
  const initialValue = form.getValues(name);
  useEffect(() => {
    if (typeof initialValue === "string") {
      setPreview(initialValue); // Tampilkan URL gambar lama sebagai preview
    }
  }, [initialValue]);

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => {
          function handleFile(file: File | null | undefined) {
            if (!file || !file.type.startsWith("image/")) return;
            field.onChange(file);

            // Buat preview dari File baru
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            setFileName(`${file.name} (${(file.size / 1024).toFixed(1)} KB)`);

            // Cleanup memory saat unmount atau ganti file
            return () => URL.revokeObjectURL(objectUrl);
          }

          function handleDrop(e: React.DragEvent) {
            e.preventDefault();
            setIsDragging(false);
            handleFile(e.dataTransfer.files[0]);
          }

          async function handlePaste() {
            try {
              const items = await navigator.clipboard.read();
              for (const item of items) {
                const imgType = item.types.find((t) => t.startsWith("image/"));
                if (imgType) {
                  const blob = await item.getType(imgType);
                  handleFile(
                    new File([blob], `pasted.${imgType.split("/")[1]}`, {
                      type: imgType,
                    }),
                  );
                }
              }
            } catch {
              // clipboard tidak tersedia
            }
          }

          function clearImage() {
            field.onChange(null);
            setPreview(null);
            setFileName(null);
            if (inputRef.current) inputRef.current.value = "";
          }

          return (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>{label}</FieldLabel>
              <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-all duration-200",
                  "cursor-pointer select-none min-h-40",
                  isDragging
                    ? "border-amber-500 bg-amber-50"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300",
                  fieldState.invalid && "border-red-300 bg-red-50",
                  className,
                )}
              >
                {preview ? (
                  <div className="relative group w-full flex flex-col items-center gap-2">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-40 max-w-full rounded-lg object-contain shadow-sm"
                    />
                    <div className="flex flex-col gap-1">
                      {fileName && (
                        <p className="text-[10px] text-slate-500 truncate max-w-50">
                          {fileName}
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearImage();
                        }}
                        className="text-xs text-red-500 font-medium hover:text-red-600 transition-colors"
                      >
                        Hapus & Ganti Gambar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-medium text-slate-700">
                      Drag & drop atau klik untuk upload
                    </p>
                    <p className="text-xs text-slate-400">
                      PNG, JPG, WEBP hingga 5MB
                    </p>
                    <div className="flex gap-2 mt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          inputRef.current?.click();
                        }}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                      >
                        Pilih File
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePaste();
                        }}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                      >
                        Paste
                      </button>
                    </div>
                  </>
                )}
              </div>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />
    </FieldGroup>
  );
}
