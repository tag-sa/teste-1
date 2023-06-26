import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, products } from '@prisma/client';
import { CurrentUserService } from '../../currentUser/currentUser.service';
import * as fs from 'fs';

@Injectable()
export class ProductsRepository {
  constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly prisma: PrismaService,
  ) {}

  async findAll(
    name?: string,
    status?: string,
    createdBy?: number,
    categoryId?: number,
    page = 1,
    pageSize = 100,
  ): Promise<{
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    data: products[];
  }> {
    const offset = (page - 1) * Number(pageSize);

    const filter: Prisma.productsWhereInput = {
      ...(name && { name: { contains: name } }),
      ...(status && { status: { equals: status } }),
      ...(createdBy && { created_by: createdBy }),
      ...(categoryId && { categories_id: categoryId }),
    };

    const products = await this.prisma.products.findMany({
      where: filter,
      skip: offset,
      take: Number(pageSize),
      include: { categories: true, users: true },
    });

    const totalItems = await this.prisma.products.count({ where: filter });

    const totalPages = Math.ceil(totalItems / Number(pageSize));

    return {
      currentPage: page,
      pageSize,
      totalPages,
      totalItems,
      data: products,
    };
  }

  async find(parameters) {
    let result;

    try {
      result = await this.prisma.products.findUnique({ where: parameters });
    } catch (error) {
      console.log(error);
      console.log('FALHA AO TENTAR BUSCAR DADOS -> TRATAR COM THROW EXCEPTION');
    }

    return result;
  }
  async create(productData: any, image: Express.Multer.File, userId: number) {
    const currentDate = new Date();
    const currentUser = userId;
    const imagePath = await this.saveImageToFile(image);

    const createdProduct = await this.prisma.products.create({
      data: {
        ...productData.data,
        created: currentDate,
        image: imagePath,
        categories_id: Number(productData.data.categories_id),
        created_by: currentUser,
      },
    });

    return createdProduct;
  }

  private async saveImageToFile(image: Express.Multer.File): Promise<string> {
    const imagePath = `../uploads/${image}`;

    return new Promise((resolve, reject) => {
      fs.writeFile(imagePath, image.buffer, (error) => {
        if (error) {
          console.error('Erro ao salvar a imagem:', error);
          reject(error);
        } else {
          console.log('Imagem salva com sucesso!');
          resolve(imagePath);
        }
      });
    });
  }

  async update(
    productsId: number,
    parameters: Partial<products>,
  ): Promise<products> {
    return this.prisma.products.update({
      where: { id: Number(productsId) },
      data: parameters,
    });
  }

  async delete(productsId: number) {
    const deleteProducts = await this.prisma.products.delete({
      where: {
        id: Number(productsId),
      },
    });

    return deleteProducts;
  }
}
