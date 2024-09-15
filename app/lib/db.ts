import { drizzle } from "drizzle-orm/node-postgres";

import pg from "pg";

// for query purposes
export const queryClient = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});
await queryClient.connect();
export const db = drizzle(queryClient);
