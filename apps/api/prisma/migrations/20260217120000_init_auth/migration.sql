CREATE TABLE `auth_users` (
  `id` CHAR(36) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `password_salt` VARCHAR(255) NOT NULL,
  `failed_attempts` INT NOT NULL DEFAULT 0,
  `locked_until` DATETIME(3) NULL,
  `last_login_at` DATETIME(3) NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_users_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `auth_login_attempts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` CHAR(36) NULL,
  `email` VARCHAR(255) NOT NULL,
  `ip` VARCHAR(45) NULL,
  `user_agent` VARCHAR(255) NULL,
  `status` ENUM('SUCCESS', 'FAILED', 'BLOCKED') NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `auth_login_attempts_user_id_idx` (`user_id`),
  KEY `auth_login_attempts_email_idx` (`email`),
  KEY `auth_login_attempts_created_at_idx` (`created_at`),
  CONSTRAINT `auth_login_attempts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `auth_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `auth_login_alerts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` CHAR(36) NULL,
  `email` VARCHAR(255) NOT NULL,
  `type` ENUM('LOCKOUT') NOT NULL,
  `message` VARCHAR(255) NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `auth_login_alerts_user_id_idx` (`user_id`),
  KEY `auth_login_alerts_email_idx` (`email`),
  KEY `auth_login_alerts_created_at_idx` (`created_at`),
  CONSTRAINT `auth_login_alerts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `auth_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
