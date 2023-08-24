import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Auth } from 'src/auth/schemas/auth.schema';

export type RatingDocument = HydratedDocument<Rating>;

@Schema({ timestamps: true })
export class Rating {
  @Prop({ type: SchemaTypes.ObjectId, ref: Auth.name })
  userId: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  rating: number;

  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
