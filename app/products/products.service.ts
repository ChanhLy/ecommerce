import { productSchema } from "./products.schema";
import { variantSchema } from "~/variants/variants.schema";
import { eq } from "drizzle-orm";
import { db } from "~/lib/db";

export const productService = {
  async findProductById(id: string) {
    const result = await db
      .select()
      .from(productSchema)
      .where(eq(productSchema.id, id))
      .innerJoin(variantSchema, eq(productSchema.id, variantSchema.id));

    if (!result.length) {
      throw new Error(`Product not found: ${id}`);
    }

    return {
      ...result[0].products,
      variants: result.map((_result) => _result.variants),
    };
  },
};
