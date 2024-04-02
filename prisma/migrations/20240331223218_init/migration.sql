/*
  Warnings:

  - You are about to drop the column `clientId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Appointment` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL
);
INSERT INTO "new_Appointment" ("date", "duration", "id") SELECT "date", "duration", "id" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
