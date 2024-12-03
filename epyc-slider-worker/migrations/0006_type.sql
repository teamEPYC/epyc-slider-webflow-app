-- Migration number: 0006 	 2024-12-01T17:51:57.850Z
CREATE TABLE IF NOT EXISTS site_and_token(id,text, siteId text, token text NOT NULL, PRIMARY KEY(id));
