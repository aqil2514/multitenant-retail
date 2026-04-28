import { BaseDeleteDialog } from "@/_shared/dialogs/base-delete-dialog";
import { useResourceAction } from "@/_shared/hooks/use-resources-action";
import { useStoreSlugParam } from "@/hooks/use-store-slug-param";
import { useProductCategory } from "../pc.context";
import { ProductCategoryFetchEdit } from "../interfaces/pc.interface";

export function ProductsCategoryDelete() {
  const { refetch } = useProductCategory();
  const slugStore = useStoreSlugParam();

  const {
    isLoadingData,
    isOpen,
    isSubmitting,
    data,
    handleClose,
    performAction,
  } = useResourceAction<ProductCategoryFetchEdit>({
    dialogType: "delete",
    endpoint: `${slugStore}/products/category`,
    refetchList: refetch,
    resourceKey: `${slugStore}-products-category`,
    translations: {
      pending: "Sedang menghapus data...",
      success: "Data kategori berhasil dihapus",
    },
    idParamKey: "idKey",
  });
  return (
    <BaseDeleteDialog
      onConfirm={performAction}
      onOpenChange={handleClose}
      open={isOpen}
      title="Hapus data"
      description="Produk dari kategori ini akan secara otomatis disetting ke belum ada kategori"
      data={data}
      isDeleting={isSubmitting}
      isLoadingData={isLoadingData}
    />
  );
}
