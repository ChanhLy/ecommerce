import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/**/*.schema.ts",
  driver: "pg",
  out: "./drizzle",
  dbCredentials: { connectionString: process.env.DATABASE_URL || "" },
});
