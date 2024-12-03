-- Migration number: 0002 	 2024-11-27T12:34:00.696Z
CREATE TABLE IF NOT EXISTS SiteToken(userId text PRIMARY KEY, token text NOT NULL);

CREATE TRIGGER IF NOT EXISTS insert_or_update_token
    AFTER INSERT ON SiteToken
    BEGIN
      UPDATE SiteToken SET token = NEW.token WHERE userId = NEW.userId;
    END;