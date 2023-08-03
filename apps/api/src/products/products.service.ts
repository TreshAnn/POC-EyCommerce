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
    const productID = createProductDto.productID;

    const productAlreadyExists = await this.productModel
      .findOne({ productID: { $eq: productID } })
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

    return product;
  }

  async findByIdAndUpdate(
    id: string,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const productID = createProductDto.productID;

    const productAlreadyExists = await this.productModel
      .findOne({ productID: { $eq: productID }, _id: { $ne: id } })
      .exec();

    if (productAlreadyExists) {
      throw new BadRequestException('Product ID already exists');
    }

    const {
      productName,
      productInfo,
      productPrice,
      productInventory,
      productCategory,
      productImg,
    } = createProductDto;

    const updateObject = {
      productName,
      productInfo,
      productPrice,
      productInventory,
      productCategory,
      'productImg.ImgURL': productImg.ImgURL,
      'productImg.ImgAttch': productImg.ImgAttch,
    };

    const updatedProduct = await this.productModel.findByIdAndUpdate(
      { _id: id },
      updateObject,
      { new: true },
    );

    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }

    console.log(updatedProduct);

    return updatedProduct;
  }
}
