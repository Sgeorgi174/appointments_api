/*
  Warnings:

  - You are about to drop the column `isBooked` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `startDateTime` on the `Availability` table. All the data in the column will be lost.
  - Added the required column `day` to the `Availability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hour` to the `Availability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAvailable` to the `Availability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Availability` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Availability" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "hour" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "isAvailable" BOOLEAN NOT NULL,
    CONSTRAINT "Availability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Availability" ("id", "userId") SELECT "id", "userId" FROM "Availability";
DROP TABLE "Availability";
ALTER TABLE "new_Availability" RENAME TO "Availability";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
