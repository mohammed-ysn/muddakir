/*
  Warnings:

  - You are about to drop the column `status` on the `Memorisation` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Memorisation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pageId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Memorisation_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Memorisation" ("createdAt", "date", "id", "pageId", "updatedAt") SELECT "createdAt", "date", "id", "pageId", "updatedAt" FROM "Memorisation";
DROP TABLE "Memorisation";
ALTER TABLE "new_Memorisation" RENAME TO "Memorisation";
CREATE UNIQUE INDEX "Memorisation_pageId_key" ON "Memorisation"("pageId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
