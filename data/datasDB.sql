BEGIN;

INSERT INTO "user" ("id", "email", "password", "pseudonyme") VALUES
(1, 'admin@admin.fr', 'admin', 'admingnl');

INSERT INTO "role" ("id", "name") VALUES
(1, 'Admin'),
(2, 'User');

INSERT INTO "user_role" ("user_id", "role_id") VALUES
(1, 1);

COMMIT;

BEGIN;

SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));
SELECT setval('role_id_seq', (SELECT MAX(id) from "role"));

COMMIT;