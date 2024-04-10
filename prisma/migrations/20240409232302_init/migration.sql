/*
  Warnings:

  - You are about to drop the `Availability` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `service` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `telegramId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to alter the column `day` on the `Appointment` table. The data in that column could be lost. The data in that column will be cast from `Int` to `DateTime`.
  - Added the required column `duration` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientName` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceName` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Availability";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserBotSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "botToken" TEXT NOT NULL,
    "botName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "UserBotSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HourAvailability" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "HourAvailability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Hour" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hour" INTEGER NOT NULL,
    "isAvailable" BOOLEAN NOT NULL,
    "availabilityId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Hour_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "HourAvailability" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Hour_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "firstName", "id", "password") SELECT "email", "firstName", "id", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE TABLE "new_Services" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Services_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Services" ("id", "name", "price") SELECT "id", "name", "price" FROM "Services";
DROP TABLE "Services";
ALTER TABLE "new_Services" RENAME TO "Services";
CREATE TABLE "new_Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" DATETIME NOT NULL,
    "hour" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "clientName" TEXT NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "serviceName" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Appointment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Appointment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Appointment" ("day", "duration", "hour", "id") SELECT "day", "duration", "hour", "id" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
CREATE TABLE "new_Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "telegramId" TEXT,
    "name" TEXT,
    "telNumber" TEXT
);
INSERT INTO "new_Client" ("id", "name", "telegramId") SELECT "id", "name", "telegramId" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_telegramId_key" ON "Client"("telegramId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "HourAvailability_date_key" ON "HourAvailability"("date");
