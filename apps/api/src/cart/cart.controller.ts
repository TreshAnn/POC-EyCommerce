import {
  Controller,
  Post,
  Body,
  Request,
  Delete,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ItemDto } from './dto/item.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   @Roles(Role.Consumer)
  //   userId = req.userId;
  @Public()
  @Post('/:id') // TO DO utilize req.user.userID
  async addItemToCart(@Param('id') userID: string, @Body() itemDto: ItemDto) {
    console.log(userID, itemDto);
    const cart = await this.cartService.addItemToCart(userID, itemDto);
    return cart;
  }

  @Delete('/')
  async removeItemFromCart(@Request() req, @Body() { productId }) {
    const userId = req.userId;
    const cart = await this.cartService.removeItemFromCart(userId, productId);
    if (!cart) throw new NotFoundException('Item does not exist');
    return cart;
  }

  @Delete('/:id')
  async deleteCart(@Param('id') userID: string) {
    const cart = await this.cartService.deleteCart(userID);
    if (!cart) throw new NotFoundException('Cart does not exist');
    return cart;
  }
}
