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
    const token = await this.cartService.extractTokenFromHeader(req);
    try {
      // Note: Temporary decoder for userID in access token; to implement in login
      const decoded = this.jwtService.decode(token) as { sub: string };
      if (decoded && decoded.hasOwnProperty('sub')) {
        const userID = decoded.sub;
        const newItemDto = await this.cartService.createItemDto(
          reqBody.productID,
          reqBody.quantity,
        );
        const cart = await this.cartService.addItemToCart(userID, newItemDto);
        return cart;
      } else {
        throw new UnauthorizedException('Invalid token or missing user ID');
      }
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Delete('/:id') // Test delete - Accepts cart objectId
  async deleteCart(@Param('id') userID: string) {
    const cart = await this.cartService.deleteCart(userID);
    if (!cart) throw new NotFoundException('Cart does not exist');
    return cart;
  }
}
