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
  @Prop({ unique: true })
  productID: string;

  @Prop()
  productImg: Image;

  @Prop()
  productName: string;

  @Prop()
  productInfo: string;

  @Prop()
  productPrice: number;

  @Prop()
  productInventory: number;

  @Prop()
  productCategory: string[];

  @Prop({ default: true })
  isActive: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
