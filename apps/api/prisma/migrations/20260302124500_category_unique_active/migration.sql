-- Allow reusing category names after soft delete
ALTER TABLE categories DROP INDEX categories_household_id_name_key;
ALTER TABLE categories ADD UNIQUE INDEX categories_household_id_name_is_active_key (household_id, name, is_active);
