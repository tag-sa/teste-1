import { Express } from 'express';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

import { ProductsService } from './products.service';

@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('status') status?: string,
    @Query('createdBy') createdBy?: number,
    @Query('categoryId') categoryId?: number,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 100,
  ) {
    return this.productsService.getProducts(
      name,
      status,
      createdBy,
      categoryId,
      page,
      pageSize,
    );
  }
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createProduct(
    @Headers() headers: any,
    @Body() products: any,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.productsService.createProduct(products, image, headers);
  }

  @Delete(':productsId')
  deleteProductsById(@Param('productsId') productsId: number) {
    //TO DO: criar validadção de parametros, vai ser via DTO?
    return this.productsService.deleteProductsById(productsId);
  }
}
