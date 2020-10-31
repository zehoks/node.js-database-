
BEGIN;

ALTER TABLE client_
	ADD COLUMN email varchar(255);
	
ALTER TABLE client_
	ADD COLUMN password varchar(255);

COMMIT;



	Begin;

	CREATE UNIQUE INDEX email_unique_idx ON client_(email);

	ALTER TABLE client_
	ALTER COLUMN password SET NOT NULL;

UPDATE client_
SET email = 'email@gmail.com', password = '123'
WHERE id = 1
	Commit;

