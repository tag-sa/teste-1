import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, categories } from '@prisma/client';

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(
    name?: string,
    page = 1,
    pageSize = 100,
  ): Promise<{
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    data: categories[];
  }> {
    const offset = (page - 1) * Number(pageSize);

    const filter: Prisma.categoriesWhereInput = {
      ...(name && { name: { contains: name } }),
    };

    const categories = await this.prisma.categories.findMany({
      where: filter,
      skip: offset,
      take: Number(pageSize),
      include: { products: true },
    });

    const totalItems = await this.prisma.categories.count({ where: filter });

    const totalPages = Math.ceil(totalItems / Number(pageSize));

    return {
      currentPage: page,
      pageSize,
      totalPages,
      totalItems,
      data: categories,
    };
  }

  async find(categoriesId) {
    let result;
    const numericUserId = parseInt(categoriesId, 10); // Converte para número

    try {
      result = await this.prisma.categories.findUnique({
        where: { id: numericUserId },
      });
    } catch (error) {
      console.log(error);
      console.log('FALHA AO TENTAR BUSCAR DADOS -> TRATAR COM THROW EXCEPTION');
    }

    return result;
  }

  async create(categorieData: any, categorieId: number) {
    console.log(categorieData, 'categories data');
    const categories = await this.prisma.categories.create({
      data: {
        ...categorieData,
      },
    });

    return categories;
  }

  async update(
    categoriesId: number,
    parameters: Partial<categories>,
  ): Promise<categories> {
    return this.prisma.categories.update({
      where: { id: Number(categoriesId) },
      data: parameters,
    });
  }

  async delete(categoriesId: number): Promise<void> {
    try {
      // Exclui os produtos associados ao usuário
      await this.prisma.products.deleteMany({
        where: {
          categories_id: Number(categoriesId),
        },
      });

      // Exclui o usuário
      await this.prisma.categories.delete({
        where: {
          id: Number(categoriesId),
        },
      });

      console.log('Usuário e produtos associados excluídos com sucesso!');
    } catch (error) {
      console.error(
        'Ocorreu um erro ao excluir o usuário e produtos associados:',
        error,
      );
    }
  }
}
