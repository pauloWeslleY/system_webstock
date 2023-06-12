/*
  Warnings:

  - The primary key for the `images` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `image_id` on the `images` table. All the data in the column will be lost.
  - The required column `id` was added to the `images` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `image_url` to the `images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_images" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    CONSTRAINT "images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
DROP TABLE "images";
ALTER TABLE "new_images" RENAME TO "images";
CREATE UNIQUE INDEX "images_product_id_image_url_key" ON "images"("product_id", "image_url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
