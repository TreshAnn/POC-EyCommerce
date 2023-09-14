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
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtService } from '@nestjs/jwt';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './schemas/order.schema';
import { CheckAbilities } from 'src/auth/ability/ability.decorator';
import { AbilityGuard } from 'src/auth/ability/ability.guard';
import { Action } from 'src/auth/ability/enum/ability.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { RolesGuard } from 'src/guards/Role.guard';
import { Role } from 'src/guards/enum/role.enum';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard)
  @Roles(Role.CONSUMER)
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: Action.Read, subject: Order })
  @UseGuards(AbilityGuard)
  @Get('/')
  async findOne(@Request() req): Promise<Order> {
    return this.orderService.findOne(req.id);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.CONSUMER)
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: Action.Read, subject: Order })
  @UseGuards(AbilityGuard)
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
