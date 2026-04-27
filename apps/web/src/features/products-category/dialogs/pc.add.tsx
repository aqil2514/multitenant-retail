import { BaseAddDialog } from "@/_shared/dialogs/base-add-dialog";
import { ProductsCategoryForm } from "../forms";
import { useResourceAction } from "@/_shared/hooks/use-resources-action";
import { useStoreSlugParam } from "@/hooks/use-store-slug-param";
import { useProductCategory } from "../pc.context";

export function ProductsCategoryAdd() {
  const { refetch } = useProductCategory();
  const storeSlug = useStoreSlugParam();

  const { isOpen, handleClose, performAction } = useResourceAction({
    dialogType: "add",
    endpoint: `${storeSlug}/products/category`,
    refetchList: refetch,
    resourceKey: `${storeSlug}-product-category`,
    translations: {
      pending: "Menambah data kategori",
      success: "Data kategori berhasil ditambah",
    },
  });

  return (
    <BaseAddDialog
      onOpenChange={handleClose}
      open={isOpen}
      title="Tambah Data Baru"
      description="Isi form di bawah ini untuk menambahkan data kategori produk baru"
      renderForm={() => <ProductsCategoryForm onSubmit={performAction} />}
    />
  );
}
