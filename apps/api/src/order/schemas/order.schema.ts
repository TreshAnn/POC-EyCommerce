import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Address, User, UserSchema } from 'src/users/schemas/user.schema';
import { Cart, Item } from 'src/cart/schemas/cart.schema';
import { Merchant } from 'src/merchants/schemas/merchant.schema';
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
export class Timestamp {
  @Prop({ default: Date.now })
  orderedAt: Date;

  @Prop({ default: null })
  processedAt: Date | null;

  @Prop({ default: null })
  shippedAt: Date | null;

  @Prop({ default: null })
  deliveredAt: Date | null;

  @Prop({ default: null })
  cancelledAt: Date | null;
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

  @Prop({ type: SchemaTypes.ObjectId, ref: Merchant.name })
  merchantId: string;

  @Prop()
  orderedItems: Item[];

  @Prop()
  timestamp: Timestamp;

  @Prop()
  totalAmount: number;

  @Prop()
  shippingFee: number;

  @Prop({
    enum: ['ordered', 'processing', 'shipped', 'delivered', 'cancelled'],
  })
  status: string;

  @Prop({ enum: ['cash'] })
  paymentMethod: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
