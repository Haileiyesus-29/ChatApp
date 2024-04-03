/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `groupId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userId_fkey";

-- DropIndex
DROP INDEX "group_receiver_index";

-- DropIndex
DROP INDEX "user_receiver_index";

-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "groupId",
DROP COLUMN "userId",
ADD COLUMN     "groupRecId" TEXT,
ADD COLUMN     "userRecId" TEXT;

-- CreateIndex
CREATE INDEX "user_receiver_index" ON "Message"("userRecId");

-- CreateIndex
CREATE INDEX "group_receiver_index" ON "Message"("groupRecId");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userRecId_fkey" FOREIGN KEY ("userRecId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_groupRecId_fkey" FOREIGN KEY ("groupRecId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
