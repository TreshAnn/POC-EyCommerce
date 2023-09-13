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
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schemas/products.schema';
import { UpdateProductDataDto } from './dto/update-product.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/guards/enum/role.enum';
import { RolesGuard } from 'src/guards/Role.guard';
import { Action } from 'src/auth/ability/enum/ability.enum';
import { CheckAbilities } from 'src/auth/ability/ability.decorator';
import { Roles } from 'src/auth/decorators/role.decorator';
import { AbilityGuard } from 'src/auth/ability/ability.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  
  @Public()
  @Get('get-all-product')
  async findAllProducts(): Promise<Product[]> {
    return this.productsService.findAllProducts();
  }

  @UseGuards(AuthGuard, RolesGuard, AbilityGuard)
  @Roles(Role.MERCHANT)
  @CheckAbilities({ action: Action.Read, subject: Product })
  @Get('get-merchant-products')
  async findAllMerchantProducts(@Request() req): Promise<Product[]> {
    return this.productsService.findAllMerchantProducts(req);
  }

  @Post('create')
  async create(@Request() req, @Body() createProductDto: CreateProductDto) {
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
