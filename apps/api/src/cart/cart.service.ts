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
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
    private productsService: ProductsService,
    private jwtService: JwtService,
  ) {}

  async createCart(
    userID: string,
    itemDto: ItemDto,
    subTotalPrice: number,
    totalAmount: number,
  ): Promise<Cart> {
    const newCart = await this.cartModel.create({
      userID,
      orderedItems: [{ ...itemDto, subTotalPrice }],
      totalAmount,
    });
    return newCart;
  }

  async createItem(productID: string, quantity: number) {
    const product = await this.productsService.findOne(productID);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }
    const itemQuantity = quantity;
    const itemDto = {
      productID: product.productID,
      productImg: product.productImg[0],
      productName: product.productName,
      productPrice: product.productPrice,
      productInventory: product.productInventory,
      quantity: itemQuantity,
    };
    return itemDto;
  }

  async getCart(userID: string): Promise<CartDocument> {
    const cart = await this.cartModel.findOne({ userID });
    return cart;
  }

  async deleteCart(userID: string): Promise<void> {
    const cart = await this.getCart(userID);

    if (!cart) {
      throw new NotFoundException('Cart does not exist');
    }

    await this.cartModel.deleteOne({ userID });
  }
  async removeItemFromCart(userId: string, productID: string): Promise<any> {
    const cart = await this.getCart(userId);

    const product = await this.productsService.findOne(productID);
    if (!product) {
      throw new NotFoundException('Item not found.');
    }
    const itemIndex = cart.orderedItems.findIndex(
      (item) => item.productID == product.productID,
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

  async addItemToCart(userID: string, itemDto: ItemDto): Promise<Cart> {
    const { productID, quantity, productPrice } = itemDto;
    const subTotalPrice =
      (await this.validateQuantity(quantity)) * productPrice;

    const cart = await this.getCart(userID);

    if (cart) {
      const itemIndex = cart.orderedItems.findIndex(
        (item) => item.productID == productID,
      );

      if (itemIndex > -1) {
        const item = cart.orderedItems[itemIndex];
        item.quantity = Number(item.quantity) + Number(quantity);
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
      const totalAmount = quantity * productPrice;
      const newCart = await this.createCart(
        userID,
        itemDto,
        subTotalPrice,
        totalAmount,
      );
      return newCart;
    }
  }
  async updateCartItem(reqHeader: any, itemDto: ItemDto): Promise<Cart> {
    const userId = await this.extractIdFromToken(reqHeader);

    const { productID, quantity, productPrice, productInventory } = itemDto;

    const cart = await this.getCart(userId);

    const validatedQuantity = await this.validateQuantity(quantity);

    if (validatedQuantity > productInventory) {
      throw new BadRequestException(
        'Requested quantity exceeds product inventory.',
      );
    }
    const itemIndex = cart.orderedItems.findIndex(
      (item) => item.productID === productID,
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
  async extractIdFromToken(request: Request): Promise<string | undefined> {
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
