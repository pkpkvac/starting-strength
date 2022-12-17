/*
  Warnings:

  - You are about to drop the `Weights` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Weights" DROP CONSTRAINT "Weights_userId_fkey";

-- DropTable
DROP TABLE "Weights";
