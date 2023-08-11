import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UpdateProductDataDto } from '../products/dto/update-product.dto';
import { Product } from '../products/schemas/products.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const ProductID = createProductDto.productID;

    const productAlreadyExists = await this.productModel
      .findOne({ productID: { $eq: ProductID } })
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

    if (product.isActive === false) {
      throw new NotFoundException('Product is Disabled');
    }

    return product;
  }

  async findByIdAndUpdate(
    id: string,
    updateData: UpdateProductDataDto,
  ): Promise<Product> {
    const existingProduct = await this.productModel.findById(id).exec();

    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    if ('productID' in updateData) {
      throw new BadRequestException('Product ID cannot be updated');
    }

    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }

    return updatedProduct;
  }

  async deactivateProduct(id: string) {
    const product = await this.productModel.findOne({ _id: id });

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    await this.productModel.findByIdAndUpdate(
      { _id: product.id },
      { isActive: false },
      {
        new: true,
      },
    );

    return 'Product is deactivated.';
  }

  async activateProduct(id: string) {
    const product = await this.productModel.findOne({ _id: id });

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    await this.productModel.findByIdAndUpdate(
      { _id: product.id },
      { isActive: true },
      {
        new: true,
      },
    );

    return 'Product is activated.';
  }
}
