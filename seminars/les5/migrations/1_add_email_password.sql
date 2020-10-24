
BEGIN;

ALTER TABLE client_
	ADD COLUMN email varchar(255);
	
ALTER TABLE client_
	ADD COLUMN password varchar(255);

COMMIT;