import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { CartModule } from 'src/cart/cart.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { AbilityModule } from 'src/auth/ability/ability.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    forwardRef(() => CartModule),
    forwardRef(() => ProductsModule),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
    AbilityModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
