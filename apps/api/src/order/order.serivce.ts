import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { CartService } from 'src/cart/cart.service';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtService } from '@nestjs/jwt';
import { extractIdFromToken } from 'src/utils/extract-token.utils';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    private cartService: CartService,
    private jwtSerivce: JwtService,
  ) {}

  async create(req: any, createOrderDto: CreateOrderDto): Promise<Order> {
    const userId = await extractIdFromToken(req, this.jwtSerivce);
    const userCart = await this.cartService.getCart(userId);

    // Merchant Shipping Fee
    // Product Matching - for loop userCart
    // Product Inventory - Update Quantity
    // Computation for Total Price
    // Delete Items from Cart

    const order = {
      ...createOrderDto,
      userId,
      userCart,
    };

    const userOrder = await this.orderModel.create(order);

    return userOrder;
  }
}
