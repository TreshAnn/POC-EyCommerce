import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Image {
  @Prop()
  ImgURL: string;

  @Prop()
  ImgAttch: string;
}

@Schema()
export class Product {
  @Prop()
  productID: string;

  @Prop()
  productImg: Image;

  @Prop()
  productName: string;

  @Prop()
  productInfo: string;

  @Prop()
  productPrice: string;

  @Prop()
  productInventory: string;

  @Prop()
  productCategory: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
