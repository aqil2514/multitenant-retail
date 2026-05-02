import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSectionProduct } from "../context";
import { ProductUnitConflictForm } from "./form";

export function ConflictAlertDialog() {
  const { conflictData } = useSectionProduct();

  if (!conflictData) return null;

  return (
    <AlertDialog open={conflictData.affectedProducts.length > 0}>
      <AlertDialogContent className="max-w-4xl!">
        <AlertDialogHeader>
          <AlertDialogTitle>Konflik Data</AlertDialogTitle>
          <AlertDialogDescription>
            Beberapa produk masih menggunakan unit yang akan dihapus. Pilih unit
            pengganti atau hapus produk tersebut.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <ProductUnitConflictForm conflictData={conflictData} />
      </AlertDialogContent>
    </AlertDialog>
  );
}
