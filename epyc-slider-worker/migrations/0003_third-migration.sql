-- Migration number: 0003 	 2024-11-29T12:09:39.431Z
CREATE TABLE IF NOT EXISTS site_token(userId text, siteId text, token text NOT NULL, PRIMARY KEY(userId, siteId ));