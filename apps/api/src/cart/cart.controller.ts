import {
  Controller,
  Post,
  Body,
  Request,
  Delete,
  NotFoundException,
  UnauthorizedException,
  Param,
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
  @Delete('/') // Note: to test, apply same token decoding in Post request above
  async removeItemFromCart(@Request() req, @Body() reqBody) {
    const userID = await this.cartService.extractIdFromToken(req);
    const cart = await this.cartService.removeItemFromCart(
      userID,
      reqBody.productID,
    );
    if (!cart) throw new NotFoundException('Item does not exist');
    return { message: 'Item successfully deleted' };
  }

  @Delete('/deleteCart')
  async deleteCart(@Request() req) {
    const userIDFromToken = await this.cartService.extractIdFromToken(req);
    const cart = await this.cartService.deleteCart(userIDFromToken);

    if (cart !== cart) {
      throw new NotFoundException('Cart does not exist');
    }

    return { message: 'Cart successfully deleted' };
  }
}
