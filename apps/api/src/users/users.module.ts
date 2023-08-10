import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { AuthModule } from '../auth/auth.module';
import { AbilityModule } from 'src/auth/ability/ability.module';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
    AbilityModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthMiddleware],
  exports: [UsersService],
})
export class UsersModule {}
