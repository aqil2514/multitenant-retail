import { zodResolver } from "@hookform/resolvers/zod";
import { ReplacementRow } from "./replacement-row";
import {
  ConflictResolutionInput,
  ConflictResolutionOutput,
  conflictResolutionSchema,
} from "@/features/settings-store/schemas/product-unit-conflict.schema";
import { useForm } from "react-hook-form";
import { ProductUnitsConflictData } from "@/features/settings-store/interface/ss-product-units";
import { useStoreSlugParam } from "@/hooks/use-store-slug-param";
import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/toast/error";
import { toast } from "react-toastify";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useSectionProduct } from "../context";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useStoreSettings } from "@/features/settings-store/ss.context";

interface Props {
  conflictData: ProductUnitsConflictData;
}

export function ProductUnitConflictForm({ conflictData }: Props) {
  const { setConflictData, setIsEditing } = useSectionProduct();
  const { refetch } = useStoreSettings();
  const storeSlug = useStoreSlugParam();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<
    ConflictResolutionInput,
    unknown,
    ConflictResolutionOutput
  >({
    resolver: zodResolver(conflictResolutionSchema),
    defaultValues: {
      replacements:
        conflictData?.affectedProducts.map((p) => ({
          productId: p.id,
          action: "replace" as const,
          unitId: "",
        })) ?? [],
    },
  });

  const handleSubmit = async (values: ConflictResolutionOutput) => {
    const url = `${storeSlug}/settings/store/product-unit/handle-conflict`;
    setIsLoading(true);

    try {
      await api.patch(url, {
        replacements: values.replacements,
        availableUnits: conflictData.availableUnits,
        toUpdate: conflictData.toUpdate,
        toCreate: conflictData.toCreate,
      });
      toast.success("Data berhasil diperbarui");
      setConflictData(null);
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error(error);
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid grid-cols-[1fr_1fr_auto] gap-4 px-1 mb-2">
          <span className="text-xs text-muted-foreground">Produk</span>
          <span className="text-xs text-muted-foreground">Unit Pengganti</span>
          <span className="text-xs text-muted-foreground w-16 text-center">
            Hapus Produk
          </span>
        </div>

        <ReplacementRow conflictData={conflictData} form={form} />
      </form>

      <AlertDialogFooter>
        <AlertDialogCancel
          onClick={() => setConflictData(null)}
          disabled={isLoading}
        >
          Batalkan
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={form.handleSubmit(handleSubmit)}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Menyimpan...
            </>
          ) : (
            "Lanjut"
          )}
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
}
