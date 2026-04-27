-- CreateTable
CREATE TABLE "store_users" (
    "id" UUID NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'crew',
    "userId" UUID NOT NULL,
    "storeId" UUID NOT NULL,

    CONSTRAINT "store_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "store_users_userId_storeId_key" ON "store_users"("userId", "storeId");

-- AddForeignKey
ALTER TABLE "store_users" ADD CONSTRAINT "store_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_users" ADD CONSTRAINT "store_users_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
