-- DropForeignKey
ALTER TABLE "Widget" DROP CONSTRAINT "Widget_userId_fkey";

-- DropIndex
DROP INDEX "User_userId_key";

-- DropIndex
DROP INDEX "Widget_widgetId_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "userId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "Widget" DROP CONSTRAINT "Widget_pkey",
DROP COLUMN "widgetId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Widget_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Widget_id_seq";

-- AddForeignKey
ALTER TABLE "Widget" ADD CONSTRAINT "Widget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
