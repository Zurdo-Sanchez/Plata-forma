-- AlterTable
ALTER TABLE `auth_users` ALTER COLUMN `updated_at` DROP DEFAULT;

-- CreateTable
CREATE TABLE `households` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `currency` VARCHAR(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4;

-- CreateTable
CREATE TABLE `household_members` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `household_id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `role` ENUM('OWNER', 'MEMBER') NOT NULL DEFAULT 'MEMBER',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `household_members_user_id_idx`(`user_id`),
    UNIQUE INDEX `household_members_household_id_user_id_key`(`household_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4;

-- CreateTable
CREATE TABLE `accounts` (
    `id` CHAR(36) NOT NULL,
    `household_id` CHAR(36) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `type` ENUM('BANK', 'CASH', 'CREDIT_CARD', 'LOAN') NOT NULL,
    `currency` VARCHAR(3) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `accounts_household_id_idx`(`household_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4;

-- CreateTable
CREATE TABLE `categories` (
    `id` CHAR(36) NOT NULL,
    `household_id` CHAR(36) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `type` ENUM('INCOME', 'EXPENSE', 'TRANSFER') NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `categories_household_id_idx`(`household_id`),
    UNIQUE INDEX `categories_household_id_name_key`(`household_id`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4;

-- CreateTable
CREATE TABLE `transactions` (
    `id` CHAR(36) NOT NULL,
    `household_id` CHAR(36) NOT NULL,
    `date` DATETIME(0) NOT NULL,
    `description` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `transactions_household_id_date_idx`(`household_id`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4;

-- CreateTable
CREATE TABLE `transaction_lines` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_id` CHAR(36) NOT NULL,
    `account_id` CHAR(36) NOT NULL,
    `category_id` CHAR(36) NULL,
    `amount` BIGINT NOT NULL,
    `memo` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `transaction_lines_transaction_id_idx`(`transaction_id`),
    INDEX `transaction_lines_account_id_idx`(`account_id`),
    INDEX `transaction_lines_category_id_idx`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4;

-- CreateTable
CREATE TABLE `credit_cards` (
    `id` CHAR(36) NOT NULL,
    `household_id` CHAR(36) NOT NULL,
    `account_id` CHAR(36) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `closing_day` INTEGER NOT NULL,
    `due_day` INTEGER NOT NULL,
    `limit_amount` BIGINT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `credit_cards_account_id_key`(`account_id`),
    INDEX `credit_cards_household_id_idx`(`household_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4;

-- CreateTable
CREATE TABLE `loans` (
    `id` CHAR(36) NOT NULL,
    `household_id` CHAR(36) NOT NULL,
    `account_id` CHAR(36) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `principal_amount` BIGINT NOT NULL,
    `interest_rate_bps` INTEGER NOT NULL,
    `start_date` DATETIME(0) NOT NULL,
    `term_months` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `loans_account_id_key`(`account_id`),
    INDEX `loans_household_id_idx`(`household_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4;

-- AddForeignKey
ALTER TABLE `household_members` ADD CONSTRAINT `household_members_household_id_fkey` FOREIGN KEY (`household_id`) REFERENCES `households`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `household_members` ADD CONSTRAINT `household_members_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `auth_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_household_id_fkey` FOREIGN KEY (`household_id`) REFERENCES `households`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categories_household_id_fkey` FOREIGN KEY (`household_id`) REFERENCES `households`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_household_id_fkey` FOREIGN KEY (`household_id`) REFERENCES `households`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_lines` ADD CONSTRAINT `transaction_lines_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_lines` ADD CONSTRAINT `transaction_lines_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_lines` ADD CONSTRAINT `transaction_lines_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `credit_cards` ADD CONSTRAINT `credit_cards_household_id_fkey` FOREIGN KEY (`household_id`) REFERENCES `households`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `credit_cards` ADD CONSTRAINT `credit_cards_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `loans` ADD CONSTRAINT `loans_household_id_fkey` FOREIGN KEY (`household_id`) REFERENCES `households`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `loans` ADD CONSTRAINT `loans_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
