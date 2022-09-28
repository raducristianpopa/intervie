/*
  Warnings:

  - You are about to drop the column `openingPk` on the `Workspace` table. All the data in the column will be lost.
  - Added the required column `workspacePk` to the `Opening` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_openingPk_fkey";

-- AlterTable
ALTER TABLE "Opening" ADD COLUMN     "workspacePk" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "openingPk";

-- AddForeignKey
ALTER TABLE "Opening" ADD CONSTRAINT "Opening_workspacePk_fkey" FOREIGN KEY ("workspacePk") REFERENCES "Workspace"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;
