/*
  Warnings:

  - You are about to drop the column `name` on the `product` table. All the data in the column will be lost.
  - Added the required column `title` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT
);
INSERT INTO "new_product" ("description", "id", "price") SELECT "description", "id", "price" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
CREATE UNIQUE INDEX "product_title_key" ON "product"("title");
CREATE UNIQUE INDEX "product_description_key" ON "product"("description");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
