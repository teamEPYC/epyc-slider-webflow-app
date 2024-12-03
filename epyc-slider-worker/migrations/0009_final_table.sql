-- Migration number: 0009 	 2024-12-03T06:23:35.976Z
CREATE TABLE IF NOT EXISTS token_id_table(id text, siteId text, token text NOT NULL, PRIMARY KEY(id));