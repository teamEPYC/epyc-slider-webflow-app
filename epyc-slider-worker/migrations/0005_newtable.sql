-- Migration number: 0005 	 2024-12-01T12:01:08.021Z
CREATE TABLE IF NOT EXISTS site_and_token(siteId text, token text NOT NULL, PRIMARY KEY(siteId));