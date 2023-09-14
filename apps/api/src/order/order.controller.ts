import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Get,
  Param,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtService } from '@nestjs/jwt';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './schemas/order.schema';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private jwtService: JwtService,
  ) {}

  @Get('get/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Get('get-all-orders')
  async findAllOrders(@Request() req): Promise<Order[]> {
    return this.orderService.findAllOrders(req);
  }

  @Post('/checkout')
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Req() req: any, @Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(req, createOrderDto);
  }
}
