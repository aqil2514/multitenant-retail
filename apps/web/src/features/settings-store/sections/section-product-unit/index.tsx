import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useStoreSettings } from "../../ss.context";
import { Edit, X, Package2 } from "lucide-react";
import { SectionProductUnitSkeleton } from "./skeleton";
import { DataBadge } from "@/_shared/data-display/data-badge";

export function SectionProductUnit() {
  const [isEditing, setIsEditing] = useState(false);
  const { data, isLoading } = useStoreSettings();

  return (
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
          <Button
            variant={"outline"}
            size={"icon"}
            disabled={isLoading}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <X /> : <Edit />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <SectionProductUnitSkeleton />
        ) : (
          <div className="flex flex-wrap gap-3">
            {data?.productUnits.map((unit) => (
              <DataBadge key={unit.id} value={unit.value} label={unit.name} />
            ))}
            {data?.productUnits.length === 0 && (
              <p className="text-sm text-muted-foreground italic">
                Belum ada unit produk yang ditambahkan.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
