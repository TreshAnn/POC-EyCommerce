import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop()
  orderDate: string;

  @Prop()
  orderStatus: string;

  @Prop()
  orderItems: string;

  @Prop()
  totalAmount: number;

  @Prop()
  paymentDetails: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
