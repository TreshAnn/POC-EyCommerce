import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaType, SchemaTypes } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
// import { Product, ProductSchema } from '../../products/schemas/products.schema'; - TEST

export type CartDocument = HydratedDocument<Cart>;

export type ItemDocument = HydratedDocument<Item>;

@Schema()
export class Item {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product' })
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
export class Cart {
  // @Prop() - TO DO remove and transfer to order/transaction schema (to be created)
  // orderDate: string;

  // @Prop() - TO DO remove and transfer to order/transaction schema (to be created)
  // orderStatus: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  userID: string;

  @Prop()
  orderedItems: Item[];

  @Prop()
  totalAmount: number;

  // @Prop() - TO DO remove and transfer to order/transaction schema (to be created)
  // paymentDetails: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
