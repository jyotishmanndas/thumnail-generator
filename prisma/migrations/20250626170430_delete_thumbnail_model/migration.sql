/*
  Warnings:

  - You are about to drop the `Thumbnail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Thumbnail" DROP CONSTRAINT "Thumbnail_userId_fkey";

-- DropTable
DROP TABLE "Thumbnail";
