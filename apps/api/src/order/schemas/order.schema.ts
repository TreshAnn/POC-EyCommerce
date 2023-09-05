import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Address, User, UserSchema } from 'src/users/schemas/user.schema';
import { Cart } from 'src/cart/schemas/cart.schema';
import { Product, ProductSchema } from '../../products/schemas/products.schema';
import { AuthSchema } from 'src/auth/schemas/auth.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Item {
  @Prop({ type: ProductSchema, ref: Product.name })
  productID: string;

  @Prop()
  productImg: string;

  @Prop()
  productName: string;

  @Prop()
  productPrice: number;

  @Prop()
  quantity: number;

  @Prop()
  subTotalPrice: number;
}

@Schema()
export class Order {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  userId: string;

  @Prop({ required: true })
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
  orderedItems: Item[];

  @Prop()
  totalAmount: number;

  @Prop({ default: Date.now })
  date: Date;

  @Prop({ required: true, enum: ['processing', 'shipped', 'delivered'] })
  status: string;

  @Prop({ required: true, enum: ['cash'] })
  paymentMethod: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
