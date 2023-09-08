import {
  Controller,
  Post,
  Body,
  Request,
  Delete,
  NotFoundException,
  Put,
  Get,
} from '@nestjs/common';
import { CartService } from './cart.service';
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('/')
  async addItemToCart(@Request() rqHeader, @Body() reqBody) {
    const newItemDto = await this.cartService.createItem(
      reqBody.productId,
      reqBody.quantity,
    );
    const cart = await this.cartService.addItemToCart(rqHeader, newItemDto);
    return cart;
  }
  @Delete('/') // Note: to test, apply same token decoding in Post request above
  async removeItemFromCart(@Request() rqHeader, @Body() reqBody) {
    const cart = await this.cartService.removeItemFromCart(
      rqHeader,
      reqBody.productId,
    );
    if (!cart) throw new NotFoundException('Item does not exist');
    if (cart.orderedItems.length === 0) this.cartService.deleteCart(rqHeader);
    return { message: 'Item successfully deleted' };
  }

  @Delete('/deleteCart')
  async deleteCart(@Request() reqHeader) {
    const cart = await this.cartService.deleteCart(reqHeader);

    return cart;
  }
  @Get('/')
  async getCart(@Request() req) {
    const userID = await this.cartService.extractIdFromToken2(req);
    const userCart = await this.cartService.getCart(userID);
    if (!userCart) return [];
    return userCart;
  }

  @Put('/')
  async updateCartItem(@Request() rqHeader, @Body() reqBody) {
    const newUpdateItemDto = await this.cartService.createItem(
      reqBody.productId,
      reqBody.quantity,
    );

    const cart = await this.cartService.updateCartItem(
      rqHeader,
      newUpdateItemDto,
    );
    return cart;
  }
}
