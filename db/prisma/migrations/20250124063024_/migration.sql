-- CreateTable
CREATE TABLE "StoreRegistration" (
    "id" SERIAL NOT NULL,
    "storeName" VARCHAR(255) NOT NULL,
    "storeLocation" VARCHAR(255) NOT NULL,
    "companyName" VARCHAR(255) NOT NULL,
    "gstNo" VARCHAR(15) NOT NULL,
    "ownerName" VARCHAR(255) NOT NULL,
    "ownerContact" VARCHAR(10) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StoreRegistration_pkey" PRIMARY KEY ("id")
);
