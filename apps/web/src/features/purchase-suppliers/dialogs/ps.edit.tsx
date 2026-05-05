import { useStoreSlugParam } from "@/hooks/use-store-slug-param";
import { usePurchaseSuppliers } from "../ps.context";
import { useResourceAction } from "@/_shared/hooks/use-resources-action";
import { BaseEditDialog } from "@/_shared/dialogs/base-edit-dialog";
import { SupplierFormInput } from "../forms/ps.schema";
import { SupplierForm } from "../forms/ps.form";
import { PurchaseSupplier } from "../interfaces/ps.interface";

export function SupplierEditDialog() {
  const { refetch } = usePurchaseSuppliers();
  const storeSlug = useStoreSlugParam();

  const { handleClose, isOpen, isLoadingData, performAction, data } =
    useResourceAction<PurchaseSupplier>({
      dialogType: "edit",
      endpoint: `${storeSlug}/purchase/suppliers`,
      refetchList: refetch,
      resourceKey: `${storeSlug}-purchase-suppliers`,
      translations: {
        pending: "Sedang memperbarui data supplier...",
        success: "Data supplier berhasil diperbarui",
      },
      idParamKey: "id",
    });

  const dialogTitle = data?.name
    ? `Edit Supplier: ${data.name}`
    : "Edit Data Supplier";
  const dialogDescription = data?.code
    ? `Perbarui informasi detail untuk supplier dengan kode ${data.code}.`
    : "Perbarui informasi detail supplier ini.";

  const defaultValues: SupplierFormInput | undefined = data
    ? {
        name: data.name,
        code: data.code ?? "",
        phone: data.phone ?? "",
        email: data.email ?? "",
        address: data.address ?? "",
        status: data.status,
        notes: data.notes ?? "",
      }
    : undefined;

  return (
    <BaseEditDialog
      onOpenChange={handleClose}
      open={isOpen}
      isLoadingData={isLoadingData}
      title={dialogTitle}
      description={dialogDescription}
      renderForm={() => (
        <SupplierForm defaultValues={defaultValues} onSubmit={performAction} />
      )}
    />
  );
}
