import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { Auth, AuthSchema } from '../../auth/schemas/auth.schema';

export type MerchantDocument = HydratedDocument<Merchant>;

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
export class Merchant {
  @Prop({ unique: true })
  merchantName: string;

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

export const MerchantSchema = SchemaFactory.createForClass(Merchant);
