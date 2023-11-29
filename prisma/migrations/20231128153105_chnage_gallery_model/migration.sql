-- DropForeignKey
ALTER TABLE `Gallery` DROP FOREIGN KEY `Gallery_userId_fkey`;

-- AlterTable
ALTER TABLE `Gallery` MODIFY `userId` VARCHAR(191) NULL,
    MODIFY `updated_at` DATETIME(3) NULL;
