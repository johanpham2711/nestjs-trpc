import { Input, Mutation, Query, Router, UseMiddlewares } from 'nestjs-trpc';
import { z } from 'zod';
import { LoggerMiddleware } from '../trpc';
import { Product, productSchema } from './product.schema';
import { ProductsService } from './products.service';

@Router({
  alias: 'products',
})
@UseMiddlewares(LoggerMiddleware)
export class ProductsRouter {
  constructor(private readonly productsService: ProductsService) {}

  @Query({
    input: z.object({
      id: z.string().optional(),
    }),
    output: productSchema,
  })
  getProductById(@Input('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Query({
    output: z.array(productSchema),
  })
  getProducts() {
    return this.productsService.getProducts();
  }

  @Mutation({
    input: productSchema,
    output: productSchema,
  })
  createProduct(@Input() productData: Product) {
    return this.productsService.createProduct(productData);
  }

  @Mutation({
    input: z.object({
      id: z.string(),
      productData: productSchema.partial(),
    }),
    output: productSchema,
  })
  updateProduct(
    @Input('id') id: string,
    @Input('productData') productData: Partial<Product>,
  ) {
    return this.productsService.updateProduct(id, productData);
  }

  @Mutation({
    input: z.object({
      id: z.string(),
    }),
    output: z.boolean(),
  })
  deleteProduct(@Input('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
