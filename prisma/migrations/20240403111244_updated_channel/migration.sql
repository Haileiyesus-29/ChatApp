/*
  Warnings:

  - You are about to drop the column `ChannelId` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_ChannelId_fkey";

-- DropIndex
DROP INDEX "channel_receiver_index";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "ChannelId";
