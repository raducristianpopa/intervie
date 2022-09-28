/*
  Warnings:

  - Added the required column `userPk` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "userPk" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_userPk_fkey" FOREIGN KEY ("userPk") REFERENCES "User"("pk") ON DELETE CASCADE ON UPDATE NO ACTION;
