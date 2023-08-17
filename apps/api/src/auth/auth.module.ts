import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth, AuthSchema } from '../auth/schemas/auth.schema';
import { CustomErrorService } from 'src/utils/service/custom-error.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService, CustomErrorService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
