import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtService } from '@nestjs/jwt';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private jwtService: JwtService,
  ) {}

  @Post('/checkout')
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Req() req: any, @Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(req, createOrderDto);
  }
  @Post('cancel/:id')
  async cancelOrder(@Param('id') id: string) {
    const canceledOrder = await this.orderService.cancelOrder(id);
    return { message: 'Order canceled successfully', canceledOrder };
  }
}
