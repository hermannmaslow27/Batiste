import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

const databaseUrl = process.env.DATABASE_URL ?? "file:./local.db";
const filename = databaseUrl.replace(/^file:/, "");

const globalForDb = globalThis as typeof globalThis & {
  __batisteSqlite?: InstanceType<typeof Database>;
};

const sqlite = globalForDb.__batisteSqlite ?? new Database(filename);
sqlite.pragma("foreign_keys = ON");

if (process.env.NODE_ENV !== "production") {
  globalForDb.__batisteSqlite = sqlite;
}

export const db = drizzle(sqlite);
