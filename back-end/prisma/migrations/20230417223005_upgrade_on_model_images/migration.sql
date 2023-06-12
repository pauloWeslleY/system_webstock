/*
  Warnings:

  - A unique constraint covering the columns `[product_id,image_url]` on the table `images` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "images_product_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "images_product_id_image_url_key" ON "images"("product_id", "image_url");
