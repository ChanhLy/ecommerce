import { Option, productSchema } from "./products.schema";
import { Variant, variantSchema } from "~/variants/variants.schema";
import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { z } from "zod";

const optionValidator = z.object({
  name: z.string(),
  value: z.string(),
})

export type Product = {
  variants: Variant[];
  id: string;
  handle: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  options: Option[] | null;
}

export const productService = {
  async findProductById(id: string): Promise<Product> {
    const result = await db
      .select()
      .from(productSchema)
      .where(eq(productSchema.id, id))
      .innerJoin(variantSchema, eq(productSchema.id, variantSchema.id));

    if (!result.length) {
      throw new Error(`Product not found: ${id}`);
    }

    const product = {
      ...result[0].products,
      variants: result.map((_result) => _result.variants),
    };

    // validate JSON
    if (product.options) {
      for (const option of product.options) {
        optionValidator.parse(option);
      }
    }

    return product;
  },
};
