/*
  Warnings:

  - You are about to drop the column `userId` on the `Availability` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Availability" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "month" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "hour" INTEGER NOT NULL,
    "isAvailable" BOOLEAN NOT NULL
);
INSERT INTO "new_Availability" ("day", "hour", "id", "isAvailable", "month") SELECT "day", "hour", "id", "isAvailable", "month" FROM "Availability";
DROP TABLE "Availability";
ALTER TABLE "new_Availability" RENAME TO "Availability";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
