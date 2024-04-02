/*
  Warnings:

  - You are about to drop the column `date` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `day` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hour` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "hour" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL
);
INSERT INTO "new_Appointment" ("duration", "id") SELECT "duration", "id" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
