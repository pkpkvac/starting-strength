-- AlterTable
ALTER TABLE "Weights" ALTER COLUMN "day" SET DEFAULT 1;

-- CreateTable
CREATE TABLE "UserWorkouts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "weights" JSONB NOT NULL,
    "notes" TEXT,

    CONSTRAINT "UserWorkouts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserWorkouts_userId_key" ON "UserWorkouts"("userId");

-- AddForeignKey
ALTER TABLE "UserWorkouts" ADD CONSTRAINT "UserWorkouts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
