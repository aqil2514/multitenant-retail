import { useResourceAction } from "@/_shared/hooks/use-resources-action";
import { useStoreSlugParam } from "@/hooks/use-store-slug-param";
import { BaseAddDialog } from "@/_shared/dialogs/base-add-dialog";
import { usePurchaseSuppliers } from "../ps.context";
import { SupplierForm } from "../forms/ps.form";

export function SupplierAddDialog() {
  const { refetch } = usePurchaseSuppliers();
  const storeSlug = useStoreSlugParam();

  const { handleClose, isOpen, performAction } = useResourceAction({
    dialogType: "add",
    endpoint: `${storeSlug}/purchase/suppliers`,
    refetchList: refetch,
    resourceKey: `${storeSlug}-purchase-suppliers`,
    translations: {
      pending: "Menambah supplier baru...",
      success: "Supplier berhasil ditambah",
    },
  });

  return (
    <BaseAddDialog
      title="Tambah Supplier"
      description="Tambahkan supplier baru ke dalam daftar supplier toko Anda."
      open={isOpen}
      onOpenChange={handleClose}
      renderForm={() => <SupplierForm onSubmit={performAction} />}
    />
  );
}
