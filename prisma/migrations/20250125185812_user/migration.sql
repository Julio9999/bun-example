-- AlterTable
ALTER TABLE "User" ADD COLUMN     "boardId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE SET NULL ON UPDATE CASCADE;
