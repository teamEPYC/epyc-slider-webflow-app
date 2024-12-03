-- Migration number: 0001 	 2024-11-27T12:16:26.933Z
CREATE TABLE IF NOT EXISTS SiteToken(userId text PRIMARY KEY, token text NOT NULL);