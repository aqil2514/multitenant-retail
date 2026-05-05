import { useStoreSlugParam } from "@/hooks/use-store-slug-param";
import { usePurchaseSuppliers } from "../ps.context";
import { useResourceAction } from "@/_shared/hooks/use-resources-action";
import { BaseDeleteDialog } from "@/_shared/dialogs/base-delete-dialog";
import { PurchaseSupplier } from "../interfaces/ps.interface";

export function SupplierDeleteDialog() {
  const { refetch } = usePurchaseSuppliers();
  const storeSlug = useStoreSlugParam();

  const {
    handleClose,
    isOpen,
    isLoadingData,
    performAction,
    data,
    isSubmitting,
  } = useResourceAction<PurchaseSupplier>({
    dialogType: "delete",
    endpoint: `${storeSlug}/purchase/suppliers`,
    refetchList: refetch,
    resourceKey: `${storeSlug}-purchase-suppliers`,
    translations: {
      pending: "Sedang menghapus data supplier...",
      success: "Data supplier berhasil dihapus",
    },
    idParamKey: "id",
  });

  return (
    <BaseDeleteDialog
      onConfirm={performAction}
      onOpenChange={handleClose}
      open={isOpen}
      data={data}
      title="Hapus Supplier"
      description="Hapus data supplier ini secara permanen."
      isDeleting={isSubmitting}
      isLoadingData={isLoadingData}
    />
  );
}
