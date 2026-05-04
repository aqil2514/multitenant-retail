import { useQueryState } from "@/_shared/hooks/use-query-state";
import { usePurchaseSuppliers } from "../ps.context";
import { RefetchButton } from "@/_shared/atoms/refetch-button";
import { Button } from "@/components/ui/button";

export function PurchaseSuppliersController() {
  const { set } = useQueryState();
  const { refetch, isFetching } = usePurchaseSuppliers();
  return (
    <div className="flex gap-4">
      <RefetchButton isFetching={isFetching} onRefetch={refetch} />
      <Button variant={"outline"} onClick={() => set("dialog", "add")}>
        Tambah Data
      </Button>
    </div>
  );
}
