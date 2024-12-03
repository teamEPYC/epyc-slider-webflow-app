export async function storeToken(
  siteIds: string[],
  token: string,
  db: D1Database
) {
  try {
    const stmt = db.prepare("INSERT INTO token_id_table VALUES (?, ?, ?)");

    await db.batch(
      siteIds.map((siteId) => {
        const id = crypto.randomUUID();
        return stmt.bind(id, siteId, token);
      })
    );

    return { success: true };
  } catch (error) {
    console.error("Error storing tokens:", error);
    throw new Error("Failed to store tokens");
  }
}

export async function getToken(siteId: string, db: D1Database) {
  try {
    const query = await db
      .prepare("SELECT * FROM token_id_table WHERE siteId = ?")
      .bind(siteId)
      .first();
    if (!query) {
      return null;
    }
    return query.token;
  } catch (error) {
    console.error("Database error while fetching token:", error);
    throw new Error("Failed to retrieve token from database");
  }
}
