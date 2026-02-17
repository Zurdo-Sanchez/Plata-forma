ALTER TABLE `auth_users`
  ADD COLUMN `is_super_admin` TINYINT(1) NOT NULL DEFAULT 0 AFTER `password_salt`;
