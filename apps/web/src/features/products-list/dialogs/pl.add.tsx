import { useResourceAction } from "@/_shared/hooks/use-resources-action";
import { useStoreSlugParam } from "@/hooks/use-store-slug-param";
import { useProductList } from "../pl.context";
import { BaseAddDialog } from "@/_shared/dialogs/base-add-dialog";
import { ProductListForm } from "../forms";

export function ProductListsAddDialog() {
  const { refetch } = useProductList();
  const storeSlug = useStoreSlugParam();
  const { handleClose, isOpen, performAction } = useResourceAction({
    dialogType: "add",
    endpoint: `${storeSlug}/products/list`,
    refetchList: refetch,
    resourceKey: `${storeSlug}-product-list`,
    translations: {
      pending: "Menambah data produk baru...",
      success: "Data produk berhasil ditambah",
    },
    hasFile: true,
  });

  return (
    <BaseAddDialog
      title="Tambah Produk"
      description="Isi form di bawah ini untuk tambah produk"
      open={isOpen}
      onOpenChange={handleClose}
      renderForm={() => <ProductListForm onSubmit={performAction} />}
    />
  );
}
