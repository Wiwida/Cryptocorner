BEGIN;

DROP TABLE IF EXISTS "user", "role", "user_role";

-- -----------------------------------------------------
-- Table "app_user"
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS "user" (

  "id" serial PRIMARY KEY,
  "email" text NOT NULL,
  "password" text NOT NULL,
  "pseudonyme" text NOT NULL,
  "status" integer NOT NULL
);

-- -----------------------------------------------------
-- Table "app_role"
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS "role" (

  "id" serial PRIMARY KEY,
  "name" text NOT NULL
);

-- -----------------------------------------------------
-- Table "user_role"
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS "user_role" (
  "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "role_id" INT NOT NULL REFERENCES "role"("id") ON DELETE CASCADE,
  PRIMARY KEY ("user_id", "role_id")
);

COMMIT;
