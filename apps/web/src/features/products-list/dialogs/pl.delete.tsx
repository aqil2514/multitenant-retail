import { useStoreSlugParam } from "@/hooks/use-store-slug-param";
import { useProductList } from "../pl.context";
import { useResourceAction } from "@/_shared/hooks/use-resources-action";
import { BaseDeleteDialog } from "@/_shared/dialogs/base-delete-dialog";
import { ProductListDelete } from "../interfaces/pl.interface";

export function ProductListsDeleteDialog() {
  const { refetch } = useProductList();
  const storeSlug = useStoreSlugParam();

  const {
    handleClose,
    isOpen,
    isLoadingData,
    performAction,
    data,
    isSubmitting,
  } = useResourceAction<ProductListDelete>({
    dialogType: "delete",
    endpoint: `${storeSlug}/products/list/delete`,
    refetchList: refetch,
    resourceKey: `${storeSlug}-product-list`,
    translations: {
      pending: "Sedang memperbarui data produk...",
      success: "Data produk berhasil diperbarui",
    },
    idParamKey: "id",
    hasFile: true,
  });

  return (
    <BaseDeleteDialog
      onConfirm={performAction}
      onOpenChange={handleClose}
      open={isOpen}
      data={data}
      title="Hapus data"
      description="Hapus data"
      isDeleting={isSubmitting}
      isLoadingData={isLoadingData}
    />
  );
}
