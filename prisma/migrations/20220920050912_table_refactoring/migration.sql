-- DropIndex
DROP INDEX "User_name_key";

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "browser" TEXT,
ADD COLUMN     "browserVersion" TEXT,
ADD COLUMN     "os" TEXT,
ADD COLUMN     "platform" TEXT,
ADD COLUMN     "userAgent" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "registerIp" TEXT,
ADD COLUMN     "userAgent" TEXT,
ALTER COLUMN "name" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Opening" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Opening_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "resume" TEXT,
    "openingPk" INTEGER,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "Interview" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "PreInterview" (
    "duration" SMALLINT NOT NULL,
    "instructions" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "interviewPk" INTEGER NOT NULL,

    CONSTRAINT "PreInterview_pkey" PRIMARY KEY ("interviewPk")
);

-- CreateTable
CREATE TABLE "PostInterview" (
    "duration" SMALLINT NOT NULL,
    "instructions" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "interviewPk" INTEGER NOT NULL,

    CONSTRAINT "PostInterview_pkey" PRIMARY KEY ("interviewPk")
);

-- CreateTable
CREATE TABLE "Question" (
    "pk" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "skill" VARCHAR(100),
    "duration" SMALLINT NOT NULL,
    "interviewPk" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "QuestionEvaluation" (
    "content" TEXT NOT NULL,
    "questionPk" INTEGER NOT NULL,

    CONSTRAINT "QuestionEvaluation_pkey" PRIMARY KEY ("questionPk")
);

-- CreateIndex
CREATE UNIQUE INDEX "Opening_id_key" ON "Opening"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_id_key" ON "Candidate"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Interview_id_key" ON "Interview"("id");

-- CreateIndex
CREATE INDEX "PreInterview_interviewPk_idx" ON "PreInterview"("interviewPk");

-- CreateIndex
CREATE INDEX "PostInterview_interviewPk_idx" ON "PostInterview"("interviewPk");

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_openingPk_fkey" FOREIGN KEY ("openingPk") REFERENCES "Opening"("pk") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PreInterview" ADD CONSTRAINT "PreInterview_interviewPk_fkey" FOREIGN KEY ("interviewPk") REFERENCES "Interview"("pk") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PostInterview" ADD CONSTRAINT "PostInterview_interviewPk_fkey" FOREIGN KEY ("interviewPk") REFERENCES "Interview"("pk") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_interviewPk_fkey" FOREIGN KEY ("interviewPk") REFERENCES "Interview"("pk") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuestionEvaluation" ADD CONSTRAINT "QuestionEvaluation_questionPk_fkey" FOREIGN KEY ("questionPk") REFERENCES "Question"("pk") ON DELETE CASCADE ON UPDATE NO ACTION;
