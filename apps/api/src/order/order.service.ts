import {
  BadRequestException,
  ForbiddenException,
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
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    private cartService: CartService,
    private productService: ProductsService,
    private jwtService: JwtService,
    private userService: UsersService,
    private authService: AuthService,
  ) {}
  async findAllOrders(userId: any): Promise<Order[]> {
    return await this.orderModel.find({ userId });
  }

  async findOrder(orderId: string, req: any): Promise<Order> {
    const order = await this.orderModel.findOne({ _id: orderId });

    if (req._id.toString() !== order.userId.toString()) {
      throw new ForbiddenException('User is unauthorized!');
    }
    if (!order) {
      throw new NotFoundException('Order is not found');
    }

    return order;
  }

  async create(req: any, createOrderDto: CreateOrderDto): Promise<Order> {
    const userId = await extractIdFromToken(req, this.jwtService);
    const authData = await this.authService.findAuthId(userId);
    const userData = await this.userService.findUserName(authData.username);
    const userCart = await this.cartService.getCart(userId);
    const selectedProductIds = createOrderDto.productId;

    const selectedProducts = await this.productService.findProductById(
      selectedProductIds,
    );

    let subTotal = 0;
    for (const selectedProduct of selectedProducts) {
      const matchingProduct = userCart.orderedItems.find(
        (item) => item.productId === selectedProduct._id.toString(),
      );

      if (!matchingProduct) {
        throw new NotFoundException(
          `Product Not Found: ${selectedProduct.productName}`,
        );
      }

      if (matchingProduct.quantity > selectedProduct.productInventory) {
        throw new BadRequestException(
          `Insufficient stock for product: ${selectedProduct.productName}`,
        );
      }

      // Calculate the subtotal price
      subTotal += selectedProduct.productPrice * matchingProduct.quantity;

      //update Product Inventory
      const updatedInventory =
        selectedProduct.productInventory - matchingProduct.quantity;

      await this.productService.updateProductInventory(
        selectedProduct._id.toString(),
        updatedInventory,
      );
    }
    //remove from Cart
    for (const productId of selectedProductIds) {
      await this.cartService.removeItemFromCart(req, productId);
    }

    // Check if there are multiple merchant IDs
    const uniqueMerchantIds = new Set(
      selectedProducts.map((product) => product.merchantID.toString()),
    );

    const totalShippingFee =
      createOrderDto.shippingFee * uniqueMerchantIds.size;

    const order = {
      ...createOrderDto,
      userId: userData._id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      address: {
        street: userData.address.street,
        city: userData.address.city,
        region: userData.address.region,
        zipcode: userData.address.zipcode,
        country: userData.address.country,
      },
      phoneNumber: userData.phoneNumber,
      orderedItems: selectedProducts.map((product) => ({
        productId: product._id,
        productName: product.productName,
        price: product.productPrice,
        quantity: userCart.orderedItems.find(
          (item) => item.productName === product.productName,
        ).quantity,
      })),
      totalAmount: subTotal + totalShippingFee,
      shippingFee: totalShippingFee,
    };

    const userOrder = await this.orderModel.create(order);
    return userOrder;
  }

  async cancelOrder(request: any, id: string): Promise<Order> {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    if (request._id.toString() !== order.userId.toString()) {
      throw new ForbiddenException('You are not allowed to cancel this order');
    }

    if (
      order.status === 'shipped' ||
      order.status === 'processing' ||
      order.status === 'delivered'
    ) {
      throw new BadRequestException(
        'Cannot cancel an order with status: ' + order.status,
      );
    }

    if (order.status === 'ordered') {
      for (const item of order.orderedItems) {
        const product = await this.productService.findOne(item.productId);
        if (product) {
          const updatedInventory = product.productInventory + item.quantity;
          await this.productService.updateProductInventory(
            item.productId,
            updatedInventory,
          );
        }
      }

      order.status = 'canceled';
      await order.save();

      return order;
    }

    throw new BadRequestException('Invalid order status for cancellation');
  }
}
