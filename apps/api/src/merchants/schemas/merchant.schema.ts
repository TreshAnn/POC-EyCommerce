import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
  @Prop()
  userType: string;

  @Prop()
  merchantName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

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
