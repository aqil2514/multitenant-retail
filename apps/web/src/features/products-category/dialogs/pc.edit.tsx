import { BaseEditDialog } from "@/_shared/dialogs/base-edit-dialog";
import { useResourceAction } from "@/_shared/hooks/use-resources-action";
import { useProductCategory } from "../pc.context";
import { useStoreSlugParam } from "@/hooks/use-store-slug-param";
import { ProductsCategoryForm } from "../forms";
import { ProductCategoryFetchEdit } from "../interfaces/pc.interface";
import { useMemo } from "react";
import { ProductCategorySchemaInput } from "../forms/pc.schema";

export function ProductsCategoryEdit() {
  const { refetch } = useProductCategory();
  const storeSlug = useStoreSlugParam();

  const { handleClose, isOpen, isLoadingData, performAction, data } =
    useResourceAction<ProductCategoryFetchEdit>({
      dialogType: "edit",
      endpoint: `${storeSlug}/products/category`,
      idParamKey: "idKey",
      refetchList: refetch,
      translations: {
        pending: "Mengedit data kategori...",
        success: "Edit data kategori berhasil",
      },
      resourceKey: `${storeSlug}-product-category`,
    });

  const defaultValues = useMemo<ProductCategorySchemaInput | undefined>(() => {
    if (!data) return undefined;

    return {
      name: data.name,
      description: data?.description || "",
      parentId: data?.parentId || "no-parent",
    };
  }, [data]);

  return (
    <BaseEditDialog
      onOpenChange={handleClose}
      open={isOpen}
      title={
        defaultValues
          ? `Edit Produk Kategori "${defaultValues.name}"`
          : `Produk Kategori tidak ditemukan`
      }
      description={
        defaultValues
          ? `Edit form di bawah ini untuk melakukan edit data "${defaultValues.name}"`
          : "Data tidak ditemukan. Pastikan anda memiliki data ini"
      }
      isLoadingData={isLoadingData}
      renderForm={
        defaultValues
          ? () => (
              <ProductsCategoryForm
                onSubmit={performAction}
                defaultValues={defaultValues}
              />
            )
          : () => null
      }
    />
  );
}
