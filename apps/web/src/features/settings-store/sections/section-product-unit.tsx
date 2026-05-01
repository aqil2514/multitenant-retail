import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useStoreSettings } from "../ss.context";
import { Edit, X, Package2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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
              <UnitBadge key={unit.id} unit={unit} />
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

/**
 * Komponen Kecil untuk menampilkan item unit
 */
const UnitBadge: React.FC<{ unit: { name: string; value: string } }> = ({
  unit,
}) => {
  return (
    <div className="flex flex-col border rounded-lg px-4 py-2 bg-secondary/20 min-w-25">
      <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
        {unit.value}
      </span>
      <span className="text-sm font-semibold">{unit.name}</span>
    </div>
  );
};

// TODO : Lanjut logicnya

/**
 * Skeleton Loading State
 */
const SectionProductUnitSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-3 animate-pulse">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-13 w-27.5 rounded-lg" />
      ))}
    </div>
  );
};
