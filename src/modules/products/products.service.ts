import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { AuthService } from '../../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly jwtService: JwtService,
  ) {}

  getProducts(
    name: string,
    status: string,
    createdBy: number,
    categoryId: number,
    page: number,
    pageSize: number,
  ) {
    return this.productsRepository.findAll(
      name,
      status,
      createdBy,
      categoryId,
      page,
      pageSize,
    );
  }

  getProductsById(productsId: number) {
    return this.productsRepository.find({ id: productsId });
  }

  async createProduct(products: any, image: any, headers: any) {
    const user = await this.jwtService.verifyAsync(
      headers.authorization.replace('Bearer ', ''),
    );
    return this.productsRepository.create({ data: products }, image, user.sub);
  }

  async updateProductsById(productsId: number, products) {
    return this.productsRepository.update(productsId, products);
  }

  async deleteProductsById(productsId: number) {
    return this.productsRepository.delete(productsId);
  }
}
