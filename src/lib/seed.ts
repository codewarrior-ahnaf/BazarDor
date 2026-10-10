import { db } from "./db";

// Ensure initial demo user exists in SQLite database
export function ensureDemoUser() {
  try {
    const existing = db
      .prepare("SELECT * FROM user WHERE email = ?")
      .get("demo@bazardor.com");

    if (!existing) {
      console.log("Creating default demo user...");
      const userId = "demo-user-id-bazardor-2026";
      const now = Date.now();

      db.prepare(
        `INSERT OR IGNORE INTO user (id, name, email, emailVerified, image, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      ).run(
        userId,
        "আবির হাসান (ডেমো)",
        "demo@bazardor.com",
        1,
        null,
        now,
        now
      );
    }
  } catch (error) {
    console.error("Error ensuring demo user:", error);
  }
}

ensureDemoUser();

