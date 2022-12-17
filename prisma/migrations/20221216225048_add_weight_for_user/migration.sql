-- AlterTable
ALTER TABLE "User" ADD COLUMN     "weightsId" TEXT;

-- CreateTable
CREATE TABLE "Weights" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weights" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "day" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Weights_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Weights_userId_key" ON "Weights"("userId");

-- AddForeignKey
ALTER TABLE "Weights" ADD CONSTRAINT "Weights_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
