-- DropForeignKey
ALTER TABLE "activity_logs" DROP CONSTRAINT "activity_logs_storeId_fkey";

-- AlterTable
ALTER TABLE "activity_logs" ALTER COLUMN "storeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
