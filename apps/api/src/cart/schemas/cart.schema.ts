import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

import { User } from 'src/users/schemas/user.schema';
import { Product, ProductSchema } from '../../products/schemas/products.schema';

export type CartDocument = HydratedDocument<Cart>;

export type ItemDocument = HydratedDocument<Item>;

@Schema()
export class Item {
  @Prop({ type: ProductSchema, ref: Product.name })
  productId: string;

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
export class Cart {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  userId: string;

  @Prop()
  orderedItems: Item[];

  @Prop()
  totalAmount: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
