-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_images" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    CONSTRAINT "images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_images" ("id", "image_url", "product_id") SELECT "id", "image_url", "product_id" FROM "images";
DROP TABLE "images";
ALTER TABLE "new_images" RENAME TO "images";
CREATE UNIQUE INDEX "images_product_id_image_url_key" ON "images"("product_id", "image_url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
