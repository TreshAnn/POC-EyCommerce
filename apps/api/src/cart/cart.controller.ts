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
import { UsersService } from 'src/users/users.service';
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
  constructor(
    private cartService: CartService,
    private usersService: UsersService,
  ) {}

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
    const user = await this.usersService.findUser(req._id);
    const userCart = await this.cartService.getCart(user._id.toString());
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
