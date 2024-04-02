-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Availability" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "month" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "hour" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "isAvailable" BOOLEAN NOT NULL,
    CONSTRAINT "Availability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Availability" ("day", "hour", "id", "isAvailable", "month", "userId") SELECT "day", "hour", "id", "isAvailable", "month", "userId" FROM "Availability";
DROP TABLE "Availability";
ALTER TABLE "new_Availability" RENAME TO "Availability";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
