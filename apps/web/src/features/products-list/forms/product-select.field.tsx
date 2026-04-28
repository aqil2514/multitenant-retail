import { UseFormReturn } from "react-hook-form";
import { ProductListInput, ProductListOutput } from "./pl.schema";
import { useFetch } from "@/_shared/hooks/use-fetch";
import { useStoreSlugParam } from "@/hooks/use-store-slug-param";
import { FormFieldSelect } from "@/_shared/forms";
import { ProductListRss } from "../interfaces/pl.interface";
import { LabelValue } from "@/@types/general";

interface Props {
  form: UseFormReturn<ProductListInput, unknown, ProductListOutput>;
  name: "unit" | "categoryId";
}

export function ProductSelectField({ form, name }: Props) {
  const storeSlug = useStoreSlugParam();
  const { data, isLoading } = useFetch<ProductListRss>(
    ["product-list-rss"],
    `${storeSlug}/products/list/rss`,
  );

  const mappedOptions: Record<Props["name"], LabelValue[]> = {
    categoryId: data?.productCategories ?? [],
    unit: data?.productUnits ?? [],
  };

  const mappedLabel: Record<Props["name"], string> = {
    categoryId: "Kategori Produk",
    unit: "Unit Produk",
  };

  return (
    <FormFieldSelect
      form={form}
      name={name}
      label={mappedLabel[name]}
      options={mappedOptions[name]}
      isLoading={isLoading}
    />
  );
}
