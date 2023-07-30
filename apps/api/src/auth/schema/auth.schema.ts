import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @Prop()
  userType: string;

  @Prop()
  username: string;

  @Prop({
    validate: {
      validator: async function (email) {
        const authModel: Model<AuthDocument> = this.constructor;
        const user = await authModel.findOne({ email });
        if (user) {
          if (this.id === user.id) {
            return true;
          }
          return false;
        }
        return true;
      },
      message: 'The specified email address is already in use.',
    },
    required: [true, 'User email required'],
  })
  email: string;

  @Prop()
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);