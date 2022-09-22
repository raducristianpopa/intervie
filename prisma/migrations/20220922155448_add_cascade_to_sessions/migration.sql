-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userPk_fkey";

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userPk_fkey" FOREIGN KEY ("userPk") REFERENCES "User"("pk") ON DELETE CASCADE ON UPDATE NO ACTION;
