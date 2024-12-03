-- Migration number: 0007 	 2024-12-03T06:14:18.207Z

CREATE TABLE IF NOT EXISTS token_table(id,text, siteId text, token text NOT NULL, PRIMARY KEY(id));
