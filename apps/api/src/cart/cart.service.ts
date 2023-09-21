import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { ItemDto } from './dto/item.dto';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
    private productsService: ProductsService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async createCart(
    userId: string,
    itemDto: ItemDto,
    subTotalPrice: number,
    totalAmount: number,
  ): Promise<Cart> {
    const newCart = await this.cartModel.create({
      userId,
      orderedItems: [{ ...itemDto, subTotalPrice }],
      totalAmount,
    });
    return newCart;
  }

  async createItem(productId: string, quantity: number) {
    const product = await this.productsService.findOne(productId);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }
    const itemQuantity = quantity;
    const itemDto = {
      productId,
      productImg: product.productImg[0],
      productName: product.productName,
      productPrice: product.productPrice,
      productInventory: product.productInventory,
      maxOrder: product.maxOrder,
      quantity: itemQuantity,
      merchantId: product.merchantID,
    };
    return itemDto;
  }

  async getCart(userId: string): Promise<CartDocument> {
    const cart = await this.cartModel.findOne({ userId });
    return cart;
  }

  async deleteCart(reqHeader: any): Promise<void> {
    const user = await this.usersService.findUser(reqHeader._id);
    const cart = await this.getCart(user._id.toString());
    if (!cart) {
      throw new NotFoundException('Cart does not exist');
    }

    await this.cartModel.deleteOne({ userId: user._id.toString() });
  }

  async removeItemFromCart(reqHeader: any, productId: string): Promise<any> {
    const user = await this.usersService.findUser(reqHeader._id);
    const cart = await this.getCart(user._id.toString());

    const product = await this.productsService.findOne(productId);
    if (!product) {
      throw new NotFoundException('Item not found.');
    }
    const itemIndex = cart.orderedItems.findIndex(
      (item) => item.productId == productId,
    );

    if (itemIndex > -1) {
      cart.orderedItems.splice(itemIndex, 1);
      this.recalculateCart(cart);
      return cart.save();
    }
  }

  private recalculateCart(cart: CartDocument) {
    cart.totalAmount = 0;
    cart.orderedItems.forEach((item) => {
      cart.totalAmount += item.quantity * item.productPrice;
    });
  }

  async addItemToCart(reqHeader: any, itemDto: ItemDto): Promise<Cart> {
    const { productId, quantity, productPrice, productInventory, maxOrder } =
      itemDto;
    const subTotalPrice =
      (await this.validateQuantity(quantity)) * productPrice;
    const user = await this.usersService.findUser(reqHeader._id);

    const cart = await this.getCart(user._id.toString());

    if (cart) {
      const itemIndex = cart.orderedItems.findIndex(
        (item) => item.productId == productId,
      );

      if (itemIndex > -1) {
        const item = cart.orderedItems[itemIndex];
        const newQuantity = Number(item.quantity) + Number(quantity);

        if (maxOrder !== null && newQuantity > maxOrder) {
          throw new BadRequestException(
            'Requested quantity exceeds maximum order quantity.',
          );
        }
        if (newQuantity > productInventory) {
          throw new BadRequestException(
            'Requested quantity exceeds product inventory.',
          );
        }

        item.quantity = newQuantity;
        item.subTotalPrice = item.quantity * item.productPrice;

        cart.orderedItems[itemIndex] = item;
        this.recalculateCart(cart);
        return cart.save();
      } else {
        cart.orderedItems.push({ ...itemDto, subTotalPrice });
        this.recalculateCart(cart);
        return cart.save();
      }
    } else {
      if (maxOrder !== null && quantity > maxOrder) {
        throw new BadRequestException(
          'Requested quantity exceeds maximum order quantity.',
        );
      }
      if (quantity > productInventory) {
        throw new BadRequestException(
          'Requested quantity exceeds product inventory.',
        );
      }
      const totalAmount = quantity * productPrice;
      const newCart = await this.createCart(
        user._id.toString(),
        itemDto,
        subTotalPrice,
        totalAmount,
      );
      return newCart;
    }
  }
  async updateCartItem(reqHeader: any, itemDto: ItemDto): Promise<Cart> {
    const user = await this.usersService.findUser(reqHeader._id);
    const { productId, quantity, productPrice, productInventory, maxOrder } =
      itemDto;

    const cart = await this.getCart(user._id.toString());

    if (maxOrder !== null && quantity > maxOrder) {
      throw new BadRequestException(
        'Requested quantity exceeds maximum order quantity.',
      );
    }
    const validatedQuantity = await this.validateQuantity(quantity);

    if (validatedQuantity > productInventory) {
      throw new BadRequestException(
        'Requested quantity exceeds product inventory.',
      );
    }
    const itemIndex = cart.orderedItems.findIndex(
      (item) => item.productId === productId,
    );
    if (itemIndex === -1) {
      throw new NotFoundException('Item not found in the cart.');
    }

    const item = cart.orderedItems[itemIndex];
    item.quantity = validatedQuantity;
    item.subTotalPrice = item.quantity * productPrice;

    cart.orderedItems[itemIndex] = item;
    this.recalculateCart(cart);

    return cart.save();
  }

  async validateQuantity(quantity: number) {
    if (quantity > 0) {
      return quantity;
    } else {
      throw new NotAcceptableException('Invalid quantity.');
    }
  }

  //Temporary token extractor and decoder for testing
  async extractIdFromToken2(request: Request): Promise<string | undefined> {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type === 'Bearer') {
      try {
        const decoded = this.jwtService.decode(token) as { sub: string };
        if (decoded && decoded.hasOwnProperty('sub')) {
          const userID = decoded.sub;
          return userID;
        } else {
          throw new UnauthorizedException('Invalid token or missing user ID');
        }
      } catch (err) {
        throw new UnauthorizedException('Invalid token');
      }
    } else {
      return undefined;
    }
  }
}
