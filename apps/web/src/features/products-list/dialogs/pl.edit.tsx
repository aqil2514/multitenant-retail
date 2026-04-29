import { useStoreSlugParam } from "@/hooks/use-store-slug-param";
import { useProductList } from "../pl.context";
import { useResourceAction } from "@/_shared/hooks/use-resources-action";
import { BaseEditDialog } from "@/_shared/dialogs/base-edit-dialog";
import { ProductListInput } from "../forms/pl.schema";
import { ProductListForm } from "../forms";

export function ProductListsEditDialog() {
  const { refetch } = useProductList();
  const storeSlug = useStoreSlugParam();

  const { handleClose, isOpen, isLoadingData, performAction, data } =
    useResourceAction<ProductListInput>({
      dialogType: "edit",
      endpoint: `${storeSlug}/products/list/edit`,
      refetchList: refetch,
      resourceKey: `${storeSlug}-product-list`,
      translations: {
        pending: "Sedang memperbarui data produk...",
        success: "Data produk berhasil diperbarui",
      },
      idParamKey: "id",
      hasFile: true,
    });

  const dialogTitle = data?.name ? `Edit Produk: ${data.name}` : "Edit Data Produk";
  const dialogDescription = data?.sku 
    ? `Perbarui informasi detail untuk produk dengan SKU ${data.sku}.`
    : "Perbarui informasi detail, stok, dan kategori produk ini.";

  return (
    <BaseEditDialog
      onOpenChange={handleClose}
      open={isOpen}
      isLoadingData={isLoadingData}
      title={dialogTitle}
      description={dialogDescription}
      renderForm={() => (
        <ProductListForm 
          defaultValues={data} 
          onSubmit={performAction} 
        />
      )}
    />
  );
}
