import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Merchant } from 'src/merchants/schemas/merchant.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  productImg: string[];

  @Prop()
  productName: string;

  @Prop()
  productInfo: string;

  @Prop()
  productPrice: number;

  @Prop()
  productInventory: number;

  @Prop({ default: null, type: Number })
  maxOrder: number | null;

  @Prop()
  productCategory: string[];

  @Prop({ type: SchemaTypes.ObjectId, ref: Merchant.name })
  merchantID: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
