import { useQueryState } from "@/_shared/hooks/use-query-state";
import { Button } from "@/components/ui/button";
import { ProductListFilter } from "./pl.filter";

export function ProductsListController() {
  const { set } = useQueryState();
  return (
    <div className="flex gap-4">
      <ProductListFilter />
      <Button variant={"outline"} onClick={() => set("dialog", "add")}>
        Tambah Data
      </Button>
    </div>
  );
}
