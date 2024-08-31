import { relations } from "drizzle-orm";
import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { variantSchema } from "~/variants/variants.schema";

export const productSchema = pgTable(
  "products",
  {
    id: uuid("id").primaryKey(),
    handle: text("handle").unique().notNull(), // human friendly unique id, may be used in URL
    title: text("title").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => {
    return {
      handleIndex: index("productHandleIndex").on(table.handle),
    };
  },
);

export const productSchemaRelations = relations(productSchema, ({ many }) => ({
  variants: many(variantSchema),
}));
