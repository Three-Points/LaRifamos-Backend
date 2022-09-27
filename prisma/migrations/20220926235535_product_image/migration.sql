-- CreateTable
CREATE TABLE "product_image" (
    "id" INTEGER NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "product_image_id_url_key" ON "product_image"("id", "url");

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_id_fkey" FOREIGN KEY ("id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
