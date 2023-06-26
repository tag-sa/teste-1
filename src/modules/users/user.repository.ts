import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, users } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(
    name?: string,
    email?: string,
    page = 1,
    pageSize = 10,
  ): Promise<{
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    data: users[];
  }> {
    const offset = (page - 1) * Number(pageSize);

    const filter: Prisma.usersWhereInput = {
      ...(name && { name: { contains: name } }),
      ...(email && { email: { contains: email } }),
    };

    const users = await this.prisma.users.findMany({
      where: filter,
      skip: offset,
      take: Number(pageSize),
      include: { products: true },
    });

    const totalItems = await this.prisma.users.count({ where: filter });

    const totalPages = Math.ceil(totalItems / Number(pageSize));

    return {
      currentPage: page,
      pageSize,
      totalPages,
      totalItems,
      data: users,
    };
  }

  async find(userId: string): Promise<users> {
    let result;
    const numericUserId = parseInt(userId, 10); // Converte para número

    try {
      result = await this.prisma.users.findUnique({
        where: { id: numericUserId },
      });
    } catch (error) {
      console.log(error);
      console.log('FALHA AO TENTAR BUSCAR DADOS -> TRATAR COM THROW EXCEPTION');
    }

    return result;
  }

  async create(parameters: Prisma.usersCreateInput): Promise<users> {
    const user = await this.prisma.users.create({
      data: parameters,
    });

    return user;
  }

  async update(
    userId: string,
    parameters: Prisma.usersUpdateInput,
  ): Promise<users> {
    const parsedUserId = parseInt(userId, 10);
    if (isNaN(parsedUserId)) {
      throw new BadRequestException('O ID do usuário é inválido.');
    }
    return this.prisma.users.update({
      where: { id: parsedUserId },
      data: parameters,
    });
  }

  async delete(userId: number): Promise<void> {
    try {
      // Exclui os produtos associados ao usuário
      await this.prisma.products.deleteMany({
        where: {
          created_by: userId,
        },
      });

      // Exclui o usuário
      await this.prisma.users.delete({
        where: {
          id: userId,
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
