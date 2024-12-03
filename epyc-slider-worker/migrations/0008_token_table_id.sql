-- Migration number: 0008 	 2024-12-03T06:20:04.795Z
DROP TABLE site_and_token;
drop table site_token;

CREATE TABLE IF NOT EXISTS token_table(id,text, siteId text, token text NOT NULL, PRIMARY KEY(id));