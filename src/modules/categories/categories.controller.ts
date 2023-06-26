import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '@nestjs/passport';
import { categories } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories(@Query() filters) {
    const { name, page, pageSize } = filters;
    return this.categoriesService.getCategories({ name, page, pageSize });
  }

  @Get(':categoriesId')
  getCategoriesById(@Param('categoriesId') categoriesId: string) {
    //TO DO: criar validação de parâmetros, será feita via DTO?
    return this.categoriesService.getCategoriesById(categoriesId);
  }

  @Post()
  createCategories(@Headers() headers: any, @Body() categories: any) {
    console.log(categories, 'CATEGORIES');
    return this.categoriesService.createCategories(categories, headers);
  }

  @Patch(':categoriesId')
  updateParcialCategories(
    @Param('categoriesId') categoriesId: number,
    @Body() categories: Partial<categories>,
  ) {
    //TO DO: criar validação de parâmetros, será feita via DTO?
    return this.categoriesService.updateCategoriesById(
      categoriesId,
      categories,
    );
  }

  @Delete(':categoriesId')
  deleteCategoriesById(@Param('categoriesId') categoriesId: number) {
    //TO DO: criar validação de parâmetros, será feita via DTO?
    return this.categoriesService.deleteCategoriesById(categoriesId);
  }
}
