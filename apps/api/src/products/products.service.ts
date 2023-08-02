import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { Product } from '../products/schemas/products.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const productAlreadyExists = await this.productModel
      .findOne({ productID: createProductDto.productID })
      .exec();
    if (productAlreadyExists) {
      throw new BadRequestException('Product ID already exists');
    }
    const createdProduct = await this.productModel.create(createProductDto);
    return createdProduct;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findOne({ _id: id });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    //console.log(merchant);

    return product;
  }
}
