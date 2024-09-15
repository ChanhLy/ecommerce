import { relations } from "drizzle-orm";
import { index, json, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { variantSchema } from "~/variants/variants.schema";

export type Option = {
  name: string;
  value: string;
}

export const productSchema = pgTable(
  "products",
  {
    id: uuid("id").primaryKey(),
    handle: text("handle").unique().notNull(), // human friendly unique id, may be used in URL
    title: text("title").notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
    options: json("options").$type<Option[]>(), // { name: string, value: string }[]
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
