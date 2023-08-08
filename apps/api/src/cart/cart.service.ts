import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { ItemDto } from './dto/item.dto';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { ProductDocument } from 'src/products/schemas/products.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
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

  async getCart(userID: string): Promise<CartDocument> {
    const cart = await this.cartModel.findOne({ userID });
    return cart;
  }

  async deleteCart(userID: string): Promise<Cart> {
    const deletedCart = await this.cartModel.findOneAndRemove({ userID });
    return deletedCart;
  }

  private recalculateCart(cart: CartDocument) {
    cart.totalAmount = 0;
    cart.orderedItems.forEach((item) => {
      cart.totalAmount += item.quantity * item.productPrice;
    });
  }

  async addItemToCart(userID: string, itemDto: ItemDto): Promise<Cart> {
    const { productID, quantity, productPrice } = itemDto;
    const subTotalPrice = quantity * productPrice;

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
      const newCart = await this.createCart(
        userID,
        itemDto,
        subTotalPrice,
        productPrice,
      );
      return newCart;
    }
  }

  async removeItemFromCart(userId: string, productId: string): Promise<any> {
    const cart = await this.getCart(userId);

    const itemIndex = cart.orderedItems.findIndex(
      (item) => item.productID == productId,
    );

    if (itemIndex > -1) {
      cart.orderedItems.splice(itemIndex, 1);
      return cart.save();
    }
  }
}
