-- Convert stored monetary amounts from units to cents
UPDATE transaction_lines
SET amount = amount * 100;

UPDATE credit_cards
SET limit_amount = limit_amount * 100
WHERE limit_amount IS NOT NULL;

UPDATE loans
SET principal_amount = principal_amount * 100;
