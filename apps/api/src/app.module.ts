import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { MerchantsModule } from './merchants/merchants.module';
import { ProductsModule } from './products/products.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { UsersController } from './users/users.controller';
import { AbilityModule } from './auth/ability/ability.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' }, // TODO move this to .env
    }),
    CatsModule,
    AuthModule,
    UsersModule,
    MerchantsModule,
    ProductsModule,
    AbilityModule,
    CartModule,
    OrderModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer): void {
//     // configure what middleware you want to apply
//     consumer
//       .apply(AuthMiddleware)
//       // the middleware will be applied to this controllers and nowhere else within the application
//       .forRoutes(UsersController);
//   }
// }
