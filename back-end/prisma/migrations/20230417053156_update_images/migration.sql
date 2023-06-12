/*
  Warnings:

  - You are about to drop the column `name` on the `images` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_images" (
    "image_id" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "images_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_images" ("image_id") SELECT "image_id" FROM "images";
DROP TABLE "images";
ALTER TABLE "new_images" RENAME TO "images";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
