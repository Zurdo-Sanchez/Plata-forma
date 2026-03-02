-- Remove category type (categories can be used for income or expense by movement)
ALTER TABLE categories DROP COLUMN type;

-- Add soft-delete flags
ALTER TABLE transactions ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE credit_cards ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE loans ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;
