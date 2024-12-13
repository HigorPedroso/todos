-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'completed');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pending',

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
