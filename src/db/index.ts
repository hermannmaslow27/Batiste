import path from "path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

let databaseUrl = process.env.DATABASE_URL ?? "file:./local.db";
// In case an incompatible PostgreSQL URL is present in environment, fall back to SQLite
if (!databaseUrl.startsWith("file:") && !databaseUrl.endsWith(".db")) {
  databaseUrl = "file:./local.db";
}

const rawFilename = databaseUrl.replace(/^file:/, "");
const filename = path.isAbsolute(rawFilename)
  ? rawFilename
  : path.resolve(process.cwd(), rawFilename);

const globalForDb = globalThis as typeof globalThis & {
  __batisteSqlite?: InstanceType<typeof Database>;
};

const sqlite = globalForDb.__batisteSqlite ?? new Database(filename);
sqlite.pragma("foreign_keys = ON");

if (process.env.NODE_ENV !== "production") {
  globalForDb.__batisteSqlite = sqlite;
}

export const db = drizzle(sqlite, { schema });
