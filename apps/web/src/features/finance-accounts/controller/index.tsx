import { RefetchButton } from "@/_shared/atoms/refetch-button";
import { useQueryState } from "@/_shared/hooks/use-query-state";
import { Button } from "@/components/ui/button";
import { useFinanceAccounts } from "../fa.context";

export function FinanceAccountsController() {
  const { set } = useQueryState();
  const {refetch, isFetching} = useFinanceAccounts()
  return (
    <div className="flex gap-4">
      <RefetchButton isFetching={isFetching} onRefetch={refetch} />
      <Button variant={"outline"} onClick={() => set("dialog", "add")}>
        Tambah Data
      </Button>
    </div>
  );
}
