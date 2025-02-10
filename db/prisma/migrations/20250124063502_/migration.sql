-- CreateEnum
CREATE TYPE "StoreStatus" AS ENUM ('PROCESSING', 'SUCCESS', 'FAILED', 'HOLD');

-- AlterTable
ALTER TABLE "StoreRegistration" ADD COLUMN     "status" "StoreStatus" NOT NULL DEFAULT 'PROCESSING';
