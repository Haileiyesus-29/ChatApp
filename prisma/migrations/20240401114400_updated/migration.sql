/*
  Warnings:

  - You are about to drop the `_ChannelAdmins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GroupAdmins` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ChannelAdmins" DROP CONSTRAINT "_ChannelAdmins_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChannelAdmins" DROP CONSTRAINT "_ChannelAdmins_B_fkey";

-- DropForeignKey
ALTER TABLE "_GroupAdmins" DROP CONSTRAINT "_GroupAdmins_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupAdmins" DROP CONSTRAINT "_GroupAdmins_B_fkey";

-- DropTable
DROP TABLE "_ChannelAdmins";

-- DropTable
DROP TABLE "_GroupAdmins";
