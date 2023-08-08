import {
  Body,
  Controller,
  Post,
  Param,
  HttpCode,
  HttpStatus,
  Get,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schemas/products.schema';
import { UpdateProductDataDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  async create(@Body() createProductDto: CreateProductDto) {
    const createdProduct = await this.productsService.create(createProductDto);
    return createdProduct;
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }
  @HttpCode(HttpStatus.OK)
  @Put('update/:id')
  async findByIdAndUpdate(
    @Body() UpdateProductDataDto: UpdateProductDataDto,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productsService.findByIdAndUpdate(id, UpdateProductDataDto);
  }
}
