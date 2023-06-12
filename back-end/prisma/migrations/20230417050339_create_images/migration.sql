/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `products` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "images" (
    "name" TEXT NOT NULL,
    "image_id" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "images_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT,
    "quantity" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "category_id" TEXT NOT NULL,
    CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_products" ("category_id", "created_at", "description", "id", "price", "quantity", "title", "updated_at") SELECT "category_id", "created_at", "description", "id", "price", "quantity", "title", "updated_at" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
CREATE UNIQUE INDEX "products_title_key" ON "products"("title");
CREATE UNIQUE INDEX "products_description_key" ON "products"("description");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "images_name_key" ON "images"("name");
