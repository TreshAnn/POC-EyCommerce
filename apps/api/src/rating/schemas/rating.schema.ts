import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Product } from 'src/products/schemas/products.schema';
import { User } from 'src/users/schemas/user.schema';

export type RatingDocument = HydratedDocument<Rating>;

@Schema()
export class Rating {
  @Prop({ type: SchemaTypes.ObjectId, ref: Product.name })
  productId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  userId: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  rating: number;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ default: Date.now })
  publishedDate: Date;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
