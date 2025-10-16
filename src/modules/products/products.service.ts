import { Injectable } from '@nestjs/common';
import { Product } from './product.schema';
import { TRPCError } from '@trpc/server';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [];

  getProductById(id: string): Product {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new TRPCError({
        message: 'Product not found',
        code: 'NOT_FOUND',
      });
    }

    return product;
  }

  getProducts(): Product[] {
    return this.products;
  }

  createProduct(productData: Product): Product {
    this.products.push(productData);
    return productData;
  }

  updateProduct(id: string, productData: Partial<Product>): Product {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) {
      throw new TRPCError({
        message: 'Product not found',
        code: 'NOT_FOUND',
      });
    }

    const newProductData = {
      ...this.products[productIndex],
      ...productData,
    };

    this.products[productIndex] = newProductData;
    return newProductData;
  }

  deleteProduct(id: string): boolean {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) {
      throw new TRPCError({
        message: 'Product not found',
        code: 'NOT_FOUND',
      });
    }

    this.products.splice(productIndex, 1);
    return true;
  }
}
