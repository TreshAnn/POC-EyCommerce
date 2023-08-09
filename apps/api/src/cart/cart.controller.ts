import {
  Controller,
  Post,
  Body,
  Request,
  Delete,
  NotFoundException,
  UnauthorizedException,
  Param,
  Get,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ItemDto } from './dto/item.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtService } from '@nestjs/jwt';
@Controller('cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private jwtService: JwtService,
  ) {}

  @Post('/')
  async addItemToCart(@Request() req, @Body() reqBody) {
    const userID = await this.cartService.extractIdFromToken(req);
    const newItemDto = await this.cartService.createItem(
      reqBody.productID,
      reqBody.quantity,
    );
    const cart = await this.cartService.addItemToCart(userID, newItemDto);
    return cart;
  }

  @Get('/:id')
  async getCart(@Param('id') userID: string) {
    const userCart = await this.cartService.getCart(userID);
    if (!userCart) throw new NotFoundException('Cart is empty');
    return userCart;
  }

  @Delete('/:id') // Test delete - Accepts cart objectId
  async deleteCart(@Param('id') userID: string) {
    const cart = await this.cartService.deleteCart(userID);
    if (!cart) throw new NotFoundException('Cart does not exist');
    return cart;
  }
}