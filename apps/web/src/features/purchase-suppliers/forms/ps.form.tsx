import { BaseFormComponentProps } from "@/_shared/forms/form.interface";
import {
  supplierDefaultValues,
  SupplierFormInput,
  SupplierFormOutput,
  SupplierSchema,
} from "./ps.schema";
import {
  BaseForm,
  FormFieldText,
  FormFieldTextarea,
  FormFieldPhone,
  FormFieldSelect,
} from "@/_shared/forms";
import { Separator } from "@/components/ui/separator";

export function SupplierForm({
  onSubmit,
  defaultValues,
}: BaseFormComponentProps<SupplierFormInput, SupplierFormOutput>) {
  return (
    <BaseForm
      defaultValues={defaultValues ?? supplierDefaultValues}
      schema={SupplierSchema}
      onSubmit={onSubmit}
    >
      {(form) => (
        <div className="space-y-6">
          {/* Informasi Utama */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold">Informasi Utama</h4>
              <p className="text-xs text-muted-foreground">
                Data utama identitas supplier
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormFieldText
                form={form}
                name="name"
                label="Nama Supplier"
                placeholder="Misal: PT. Sumber Makmur"
              />
              <FormFieldText
                form={form}
                name="code"
                label="Kode Supplier"
                placeholder="Misal: SUP-001"
              />
            </div>
            <FormFieldSelect
              form={form}
              name="status"
              label="Status"
              options={[
                { label: "Aktif", value: "ACTIVE" },
                { label: "Tidak Aktif", value: "INACTIVE" },
              ]}
            />
          </div>

          <Separator />

          {/* Kontak */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold">Kontak</h4>
              <p className="text-xs text-muted-foreground">
                Informasi kontak supplier
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormFieldPhone
                form={form}
                name="phone"
                label="Nomor Telepon"
                placeholder="Misal: 08123456789"
              />
              <FormFieldText
                form={form}
                name="email"
                label="Email"
                placeholder="Misal: supplier@email.com"
              />
            </div>
            <FormFieldTextarea
              form={form}
              name="address"
              label="Alamat"
              placeholder="Masukkan alamat lengkap supplier"
            />
          </div>

          <Separator />

          {/* Lainnya */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold">Lainnya</h4>
              <p className="text-xs text-muted-foreground">
                Informasi tambahan mengenai supplier
              </p>
            </div>
            <FormFieldTextarea
              form={form}
              name="notes"
              label="Catatan"
              placeholder="Catatan tambahan mengenai supplier (opsional)"
            />
          </div>
        </div>
      )}
    </BaseForm>
  );
}
