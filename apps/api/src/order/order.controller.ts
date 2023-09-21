import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './schemas/order.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/guards/Role.guard';
import { AbilityGuard } from 'src/auth/ability/ability.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/guards/enum/role.enum';
import { CheckAbilities } from 'src/auth/ability/ability.decorator';
import { Action } from 'src/auth/ability/enum/ability.enum';
import { UsersService } from 'src/users/users.service';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private userService: UsersService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard, AbilityGuard)
  @Roles(Role.CONSUMER)
  @CheckAbilities({ action: Action.Read, subject: Order })
  @Get('all-delivered-orders')
  async getAllDeliveredOrders(@Request() req): Promise<Order[]> {
    return await this.orderService.getAllDeliveredOrders(req._id);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.CONSUMER)
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: Action.Read, subject: Order })
  @UseGuards(AbilityGuard)
  @Get('get-all')
  async findAll(@Request() request): Promise<Order[]> {
    return this.orderService.findAll(request._id);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.CONSUMER)
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: Action.Read, subject: Order })
  @UseGuards(AbilityGuard)
  @Get('/:id')
  async findOrder(
    @Param('id') orderId: string,
    @Request() req,
  ): Promise<Order> {
    return this.orderService.findOrder(orderId, req);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.CONSUMER)
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: Action.Create, subject: Order })
  @UseGuards(AbilityGuard)
  @Post('/checkout')
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Req() req: any, @Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(req, createOrderDto);
  }
  @Post('cancel/:id')
  async cancelOrder(@Request() request, @Param('id') id: string) {
    const canceledOrder = await this.orderService.cancelOrder(request._id, id);
    return { message: 'Order cancelled successfully', canceledOrder };
  }
}
