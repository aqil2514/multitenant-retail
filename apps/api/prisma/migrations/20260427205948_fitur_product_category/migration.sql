-- AlterTable
ALTER TABLE "product_categories" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMPTZ,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "parentId" UUID,
ADD COLUMN     "updatedAt" TIMESTAMPTZ,
ADD CONSTRAINT "product_categories_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "product_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
