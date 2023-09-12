import {
  Controller,
  Post,
  Body,
  Request,
  Delete,
  NotFoundException,
  Put,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/guards/Role.guard';
import { AbilityGuard } from 'src/auth/ability/ability.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/guards/enum/role.enum';
import { CheckAbilities } from 'src/auth/ability/ability.decorator';
import { Action } from 'src/auth/ability/enum/ability.enum';
import { Cart } from './schemas/cart.schema';
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(AuthGuard, RolesGuard, AbilityGuard)
  @Roles(Role.CONSUMER)
  @CheckAbilities({ action: Action.Create, subject: Cart })
  @Post('/')
  async addItemToCart(@Request() rqHeader, @Body() reqBody) {
    const newItemDto = await this.cartService.createItem(
      reqBody.productId,
      reqBody.quantity,
    );
    const cart = await this.cartService.addItemToCart(rqHeader, newItemDto);
    return cart;
  }
  @UseGuards(AuthGuard, RolesGuard, AbilityGuard)
  @Roles(Role.CONSUMER)
  @CheckAbilities({ action: Action.Delete, subject: Cart })
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
  @UseGuards(AuthGuard, RolesGuard, AbilityGuard)
  @Roles(Role.CONSUMER)
  @CheckAbilities({ action: Action.Delete, subject: Cart })
  @Delete('/deleteCart')
  async deleteCart(@Request() reqHeader) {
    const cart = await this.cartService.deleteCart(reqHeader);

    return cart;
  }
  @UseGuards(AuthGuard, RolesGuard, AbilityGuard)
  @Roles(Role.CONSUMER)
  @CheckAbilities({ action: Action.Read, subject: Cart })
  @Get('/')
  async getCart(@Request() req) {
    const userID = await this.cartService.extractIdFromToken2(req);
    const userCart = await this.cartService.getCart(userID);
    if (!userCart) return [];
    return userCart;
  }

  @UseGuards(AuthGuard, RolesGuard, AbilityGuard)
  @Roles(Role.CONSUMER)
  @CheckAbilities({ action: Action.Update, subject: Cart })
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
