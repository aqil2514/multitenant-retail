import z from "zod";

const productReplacementSchema = z.discriminatedUnion("action", [
  z.object({
    productId: z.uuid(),
    action: z.literal("replace"),
    unitId: z.uuid("Pilih unit pengganti"),
  }),
  z.object({
    productId: z.uuid(),
    action: z.literal("delete"),
    unitId: z.string().optional(),
  }),
]);

export const conflictResolutionSchema = z.object({
  replacements: z
    .array(productReplacementSchema)
    .min(1, "Minimal satu produk harus diselesaikan")
    .refine(
      (items) =>
        items.every(
          (item) =>
            item.action === "delete" ||
            (item.action === "replace" && !!item.unitId),
        ),
      "Semua produk harus memiliki unit pengganti atau ditandai untuk dihapus",
    ),
});

export type ConflictResolutionInput = z.input<typeof conflictResolutionSchema>;
export type ConflictResolutionOutput = z.output<
  typeof conflictResolutionSchema
>;
