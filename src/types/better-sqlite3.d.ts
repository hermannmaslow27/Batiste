declare module "better-sqlite3" {
  interface Database {
    pragma(source: string): unknown;
  }

  interface DatabaseConstructor {
    new (filename: string): Database;
  }

  const Database: DatabaseConstructor;
  export = Database;
}
