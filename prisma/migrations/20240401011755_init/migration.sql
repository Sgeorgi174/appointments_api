/*
  Warnings:

  - You are about to drop the column `clientId` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `telegramId` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telegramId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "telegramId" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Client" ("id", "name") SELECT "id", "name" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE TABLE "new_Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "month" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "hour" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "telegramId" INTEGER NOT NULL,
    "service" TEXT NOT NULL,
    CONSTRAINT "Appointment_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Appointment" ("day", "duration", "hour", "id", "month", "service") SELECT "day", "duration", "hour", "id", "month", "service" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
