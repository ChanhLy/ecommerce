import { relations } from "drizzle-orm";
import { numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { productSchema } from "~/products/products.schema";

export type Variant = {
  id: string;
  options: string[] | null;
  sku: string;
  price: string;
  productId: string;
};

export const variantSchema = pgTable("variants", {
  id: uuid("id").primaryKey(),
  sku: text("sku").notNull(),
  price: numeric("price").default("0").notNull(),
  options: text("options").array(),
  productId: uuid("productId")
    .notNull()
    .references(() => productSchema.id),
});

export const variantSchemaRelations = relations(variantSchema, ({ one }) => ({
  product: one(productSchema, {
    fields: [variantSchema.productId],
    references: [productSchema.id],
  }),
}));
