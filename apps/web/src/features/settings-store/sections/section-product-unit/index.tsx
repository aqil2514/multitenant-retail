import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStoreSettings } from "../../ss.context";
import { Edit, X, Package2 } from "lucide-react";
import { SectionProductUnitSkeleton } from "./skeleton";
import { ProductUnitForm } from "./forms";
import { SectionProductProvider, useSectionProduct } from "./context";
import { ConflictAlertDialog } from "./conflict-alert-dialog";

export function SectionProductUnit() {
  return (
    <SectionProductProvider>
      <InnerTemplate />
    </SectionProductProvider>
  );
}

const InnerTemplate = () => {
  const { isEditing, setIsEditing } = useSectionProduct();
  const { isLoading } = useStoreSettings();
  return (
    <>
      <Card className="border-none shadow-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Package2 className="h-5 w-5" />
                Unit Produk
              </CardTitle>
              <CardDescription>
                Kelola satuan unit yang digunakan untuk mendefinisikan stok dan
                penjualan produk.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button
            variant={"outline"}
            size={"icon"}
            disabled={isLoading}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <X /> : <Edit />}
          </Button>
          {isLoading ? <SectionProductUnitSkeleton /> : <ProductUnitForm />}
        </CardContent>
      </Card>

      <ConflictAlertDialog />
    </>
  );
};
