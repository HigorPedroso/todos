-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "idUser" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
