import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Address, User, UserSchema } from 'src/users/schemas/user.schema';
import { Cart, Item } from 'src/cart/schemas/cart.schema';
import { AuthSchema } from 'src/auth/schemas/auth.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class UserAddress {
  @Prop()
  street: string;

  @Prop()
  city: string;

  @Prop()
  region: string;

  @Prop()
  zipcode: string;

  @Prop()
  country: string;
}

@Schema()
export class Order {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  userId: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  address: UserAddress;

  @Prop()
  phoneNumber: string;

  @Prop({ type: AuthSchema })
  email: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: Cart.name })
  orderId: string;

  @Prop()
  orderedItems: Item[];

  @Prop()
  totalAmount: number;

  @Prop()
  shippingFee: number;

  @Prop({ default: Date.now })
  date: Date;

  @Prop({ enum: ['ordered', 'processing', 'shipped', 'delivered', 'Canceled'] })
  status: string;

  @Prop({ enum: ['cash'] })
  paymentMethod: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
