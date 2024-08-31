import { drizzle } from "drizzle-orm/node-postgres";

import pg from "pg";

// for migrations

// const migrationClient = postgres("postgres://postgres:adminadmin@0.0.0.0:5432/dbServer", { max: 1 });
// migrate(drizzle(migrationClient), ...)

// for query purposes
export const queryClient = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});
await queryClient.connect();
export const db = drizzle(queryClient);
