/* eslint-disable @next/next/no-img-element */
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
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
  .instanceof(File, { message: "Gambar wajib diupload" })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "Ukuran gambar maksimal 5MB",
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Format gambar harus PNG, JPG, atau WEBP",
  });

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

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => {
          function handleFile(file: File | null | undefined) {
            if (!file || !file.type.startsWith("image/")) return;
            field.onChange(file);
            setPreview(URL.createObjectURL(file));
            setFileName(`${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
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
              // clipboard tidak tersedia atau tidak ada gambar
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
                  "cursor-pointer select-none",
                  isDragging
                    ? "border-amber-500 bg-amber-50"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300",
                  fieldState.invalid && "border-red-300 bg-red-50",
                  className,
                )}
              >
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-40 max-w-full rounded-lg object-contain"
                    />
                    {fileName && (
                      <p className="text-xs text-slate-500">{fileName}</p>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearImage();
                      }}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Hapus gambar
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-slate-700">
                      Drag & drop atau klik untuk upload
                    </p>
                    <p className="text-xs text-slate-400">
                      PNG, JPG, WEBP hingga 5MB
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          inputRef.current?.click();
                        }}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 hover:border-slate-300"
                      >
                        Upload file
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePaste();
                        }}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 hover:border-slate-300"
                      >
                        Tempel dari clipboard
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
