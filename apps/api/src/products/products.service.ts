import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UpdateProductDataDto } from '../products/dto/update-product.dto';
import { Product } from '../products/schemas/products.schema';

import { MerchantsService } from 'src/merchants/merchants.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    private readonly merchantsService: MerchantsService,
  ) {}

  async create(req: any, createProductDto: CreateProductDto): Promise<Product> {
    const merchant = await this.merchantsService.findOne(req._id);
    const createdProduct = await this.productModel.create({
      ...createProductDto,
      merchantID: merchant._id.toString(),
    });
    return createdProduct;
  }

  async findOne(id: string) {
    const product = await this.productModel.findOne({ _id: id });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.isActive === false) {
      throw new NotFoundException('Product is Disabled');
    }

    return product;
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productModel.find();
  }

  async findAllMerchantProducts(req: any): Promise<Product[]> {
    const merchant = await this.merchantsService.findOne(req._id);
    return this.productModel.find({
      merchantID: merchant._id.toString(),
    });
  }

  async findByIdAndUpdate(
    id: string,
    updateData: UpdateProductDataDto,
  ): Promise<Product> {
    const existingProduct = await this.productModel.findById(id).exec();

    if (!existingProduct) {
      throw new NotFoundException('Product not found');
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

  async findProductById(productId: string[]) {
    const products = await this.productModel.find({
      _id: { $in: productId },
    });
    return products;
  }

  async updateProductInventory(productId: string, updatedInventory: number) {
    const product = await this.productModel.findOne({ _id: productId });

    if (!product) {
      throw new NotFoundException(`Product not found`);
    }

    product.productInventory = updatedInventory;
    await product.save();

    return product;
  }
}
