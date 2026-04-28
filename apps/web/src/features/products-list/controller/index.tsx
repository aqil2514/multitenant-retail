import { useQueryState } from "@/_shared/hooks/use-query-state";
import { Button } from "@/components/ui/button";

export function ProductsListController() {
  const { set } = useQueryState();
  return (
    <div className="flex gap-4">
      <Button variant={"outline"} onClick={() => set("dialog", "add")}>
        Tambah Data
      </Button>
    </div>
  );
}
