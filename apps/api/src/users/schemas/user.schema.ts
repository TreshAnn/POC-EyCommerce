import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Auth, AuthSchema } from '../../auth/schemas/auth.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class Address {
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
export class User {
  @Prop({ type: AuthSchema, ref: Auth.name })
  auth: Auth;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  address: Address;

  @Prop()
  phoneNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
