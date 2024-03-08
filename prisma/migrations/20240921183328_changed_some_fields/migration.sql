/*
  Warnings:

  - You are about to drop the column `CreatedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `LastLogin` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `CreatedAt`,
    DROP COLUMN `LastLogin`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `lastLogin` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
