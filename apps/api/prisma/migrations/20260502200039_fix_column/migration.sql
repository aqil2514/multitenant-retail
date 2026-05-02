/*
  Warnings:

  - You are about to drop the column `baseCostPrice` on the `product_categories` table. All the data in the column will be lost.
  - You are about to drop the column `baseSellingPrice` on the `product_categories` table. All the data in the column will be lost.
  - Added the required column `baseCostPrice` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baseSellingPrice` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_categories" DROP COLUMN "baseCostPrice",
DROP COLUMN "baseSellingPrice";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "baseCostPrice" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "baseSellingPrice" DECIMAL(12,2) NOT NULL;
