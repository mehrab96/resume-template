/*
  Warnings:

  - Made the column `userId` on table `Gallery` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Gallery_userId_fkey` ON `Gallery`;

-- AlterTable
ALTER TABLE `Gallery` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Gallery` ADD CONSTRAINT `Gallery_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
