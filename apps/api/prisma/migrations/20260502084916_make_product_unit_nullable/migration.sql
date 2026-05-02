-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_unitId_fkey";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "unitId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "product_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;
