import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Address, User, UserSchema } from 'src/users/schemas/user.schema';
import { Cart, Item } from 'src/cart/schemas/cart.schema';
import { AuthSchema } from 'src/auth/schemas/auth.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  userId: string;

  @Prop()
  name: string;

  @Prop({ type: UserSchema })
  address: Address;

  @Prop({ type: UserSchema })
  phoneNumber: string;

  @Prop({ type: AuthSchema })
  email: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: Cart.name })
  orderId: string;

  @Prop()
  productID: string[];

  @Prop()
  orderedItems: Item[];

  @Prop()
  totalAmount: number;

  @Prop()
  shippingFee: number;

  @Prop({ default: Date.now })
  date: Date;

  @Prop({ enum: ['ordered', 'processing', 'shipped', 'delivered'] })
  status: string;

  @Prop({ enum: ['cash'] })
  paymentMethod: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
