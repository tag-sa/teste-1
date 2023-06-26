import { Body, Injectable, Query } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { JwtService } from '@nestjs/jwt';
import { categories } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  getCategories(@Query() filters) {
    const { name, page, pageSize } = filters;
    return this.categoriesRepository.findAll(name, +page, +pageSize);
  }

  getCategoriesById(categoriesId: string) {
    return this.categoriesRepository.find(categoriesId);
  }

  async createCategories(categories: any, headers: any) {
    const categorie = await this.jwtService.verifyAsync(
      headers.authorization.replace('Bearer ', ''),
    );
    return this.categoriesRepository.create(categories, categorie.sub);
  }

  async updateCategoriesById(
    categoriesId: number,
    categories: Partial<categories>,
  ) {
    return this.categoriesRepository.update(categoriesId, categories);
  }

  async deleteCategoriesById(categoriesId: number) {
    return this.categoriesRepository.delete(categoriesId);
  }
}
export { CategoriesRepository };
