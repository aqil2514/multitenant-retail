import { FilterState } from "@/_shared/filters/filter.interface";
import { encodeFilters } from "@/_shared/filters/filter.utils";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  filters: FilterState[];
}

export function FinanceLedgerAction({ filters }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const viewHandler = () => {
    const filterUrl = encodeFilters(filters);
    const url = `${pathname}?${filterUrl}`;

    router.replace(url);
  };
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button onClick={viewHandler}>
        <Eye /> Tampilkan Data
      </Button>
      <Button variant={"outline"}>
        {" "}
        <Download /> Unduh PDF
      </Button>
    </div>
  );
}
