import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtService } from '@nestjs/jwt';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './schemas/order.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/guards/Role.guard';
import { AbilityGuard } from 'src/auth/ability/ability.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/guards/enum/role.enum';
import { CheckAbilities } from 'src/auth/ability/ability.decorator';
import { Action } from 'src/auth/ability/enum/ability.enum';

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

  @UseGuards(AuthGuard, RolesGuard, AbilityGuard)
  @Roles(Role.CONSUMER)
  @CheckAbilities({ action: Action.Read, subject: Order })
  @Get('/')
  async getUserOrder(@Request() req): Promise<Order> {
    return await this.orderService.getUserOrder(req);
  }

  @UseGuards(AuthGuard, RolesGuard, AbilityGuard)
  @Roles(Role.CONSUMER)
  @CheckAbilities({ action: Action.Read, subject: Order })
  @Get('all-user-orders')
  async getAllUserOrders(@Request() req): Promise<Order[]> {
    return await this.orderService.getAllUserOrders(req);
  }

  @UseGuards(AuthGuard, RolesGuard, AbilityGuard)
  @Roles(Role.CONSUMER)
  @CheckAbilities({ action: Action.Read, subject: Order })
  @Get('all-delivered-orders')
  async getAllDeliveredOrders(@Request() req): Promise<Order[]> {
    return await this.orderService.getAllDeliveredOrders(req);
  }
}
