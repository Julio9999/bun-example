-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "disabled" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "disabled" BOOLEAN DEFAULT false;
