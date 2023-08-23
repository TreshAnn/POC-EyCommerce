import {
  Body,
  Controller,
  Post,
  Param,
  HttpCode,
  HttpStatus,
  Request,
  Get,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schemas/products.schema';
import { UpdateProductDataDto } from './dto/update-product.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get('get-all-product')
  async findAllProducts(): Promise<Product[]> {
    return this.productsService.findAllProducts();
  }

  @Post('create')
  async create(@Request() req, @Body() createProductDto: CreateProductDto) {
    console.log(createProductDto);
    const createdProduct = await this.productsService.create(
      req,
      createProductDto,
    );
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

  @HttpCode(HttpStatus.OK)
  @Put('deactivateProduct/:id')
  deactivateProduct(@Param('id') id: string) {
    return this.productsService.deactivateProduct(id);
  }

  @HttpCode(HttpStatus.OK)
  @Put('activateProduct/:id')
  activateProduct(@Param('id') id: string) {
    return this.productsService.activateProduct(id);
  }
}
