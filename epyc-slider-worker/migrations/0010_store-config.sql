-- Migration number: 0010 	 2024-12-03T10:46:11.547Z
CREATE TABLE IF NOT EXISTS site_config(id text, sitename text, config text, PRIMARY KEY(id));