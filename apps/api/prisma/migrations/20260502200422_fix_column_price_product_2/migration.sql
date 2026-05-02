-- AlterTable
ALTER TABLE "products" ALTER COLUMN "baseSellingPrice" SET DEFAULT 0,
ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");

-- DropIndex (setelah primary key dibuat, foreign key akan pindah referensi ke primary key)
DROP INDEX "products_id_key" CASCADE;