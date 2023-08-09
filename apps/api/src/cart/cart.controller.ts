import {
  Controller,
  Post,
  Body,
  Request,
  Delete,
  NotFoundException,
  UnauthorizedException,
  Param,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
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

  @Delete('/:id') // Test delete - Accepts cart objectId
  async deleteCart(@Param('id') userID: string) {
    const cart = await this.cartService.deleteCart(userID);
    if (!cart) throw new NotFoundException('Cart does not exist');
    return cart;
  }

  @Put('/:id')
  async updateCartItem(
    @Param('id') userID: string,
    @Body() reqBody,
    @Request() req,
  ) {
    const userIDFromToken = await this.cartService.extractIdFromToken(req);

    if (userIDFromToken !== userID) {
      throw new UnauthorizedException('Unauthorized to update this cart item.');
    }
    const newUpdateItemDto = await this.cartService.createItem(
      reqBody.productID,
      reqBody.quantity,
    );

    const cart = await this.cartService.updateCartItem(
      userID,
      newUpdateItemDto,
    );

    return cart;
  }
}
