-- AlterTable
ALTER TABLE `users` MODIFY `isActive` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `LastLogin` DATETIME(3) NULL;
