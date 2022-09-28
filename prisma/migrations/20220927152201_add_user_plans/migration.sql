-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('Free', 'Standard', 'Enterprise');

-- CreateEnum
CREATE TYPE "WorkspaceTypes" AS ENUM ('Personal', 'Organization');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT 'Free';

-- CreateTable
CREATE TABLE "Workspace" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "type" "WorkspaceTypes" NOT NULL,
    "openingPk" INTEGER NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("pk")
);

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_id_key" ON "Workspace"("id");

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_openingPk_fkey" FOREIGN KEY ("openingPk") REFERENCES "Opening"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;
