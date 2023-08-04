import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Items {
  @Prop({ type: ProductSchema, ref: Product.name })
  product_id: Product;

  @Prop()
  productImg: string;

  @Prop()
  productName: string;

  @Prop()
  productPrice: number;

  @Prop()
  quantity: number;
}

@Schema()
export class Cart {
  @Prop()
  orderDate: string;

  @Prop()
  orderStatus: string;

  @Prop()
orderedItems:  Items[]

  @Prop()
  totalAmount: number;

  @Prop()
  paymentDetails: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
