-- Migration number: 0004 	 2024-12-01T10:23:00.984Z
CREATE TABLE IF NOT EXISTS site_token(siteId text, token text NOT NULL, PRIMARY KEY(siteId ));