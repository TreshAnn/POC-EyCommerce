import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { CartService } from 'src/cart/cart.service';
import { ProductsService } from 'src/products/products.service';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtService } from '@nestjs/jwt';
import { extractIdFromToken } from 'src/utils/extract-token.utils';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    private cartService: CartService,
    private productService: ProductsService,
    private jwtSerivce: JwtService,
  ) {}

  // Objectives:
  // Merchant Shipping Fee
  // Product Matching - for loop userCart
  // Product Inventory - Update Quantity
  // Computation for Total Price
  // Delete Items from Cart

  async processItems(orderedItems, productInventory) {
    const result = [];
    //Add Unique ID for matching
    orderedItems.forEach((orderItem) => {
      const matchingProduct = productInventory.find(
        (product) => product.productName === orderItem.productName,
      );

      if (matchingProduct) {
        const remainingQuantity =
          matchingProduct.productInventory - orderItem.quantity;

        if (remainingQuantity >= 0) {
          // Update the productInventory with the remaining quantity
          matchingProduct.productInventory = remainingQuantity;

          result.push({
            productId: orderItem._id,
            productInventoryy: remainingQuantity,
          });
        } else {
          // Handle case where the order exceeds the available stock
          throw new BadRequestException(
            `Insufficient stock for ${orderItem.productName}`,
          );
        }
      } else {
        // Handle case where the product is not found in inventory
        throw new NotFoundException(
          `Product not found: ${orderItem.productName}`,
        );
      }
    });
  }

  async create(req: any, createOrderDto: CreateOrderDto): Promise<Order> {
    const userId = await extractIdFromToken(req, this.jwtSerivce);
    const userCart = await this.cartService.getCart(userId);
    const productInventory = [];

    userCart.orderedItems.forEach(async (cart) => {
      const productData = await this.productService.findOne(cart.productID);
      productInventory.push(productData);
    });

    // Process the items and get the result
    const productInventoryCheck = await this.processItems(
      userCart.orderedItems,
      productInventory,
    );
    console.log('Inventory Management: ', productInventoryCheck);

    const order = {
      ...createOrderDto,
      userId,
      userCart,
    };

    const userOrder = await this.orderModel.create(order);
    this.cartService.deleteCart(userId);

    return userOrder;
  }
}
