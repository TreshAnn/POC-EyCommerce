import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { CartService } from 'src/cart/cart.service';
import { ProductsService } from 'src/products/products.service';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    private cartService: CartService,
    private productService: ProductsService,
    private userService: UsersService,
  ) {}
  async findAll(userId: any): Promise<Order[]> {
    return await this.orderModel.find({ userId });
  }

  async findOrder(orderId: string, req: any): Promise<Order> {
    const order = await this.orderModel.findOne({ _id: orderId });

    if (req._id.toString() !== order.userId.toString()) {
      throw new UnauthorizedException('User is unauthorized!');
    }
    if (!order) {
      throw new NotFoundException('Order is not found');
    }

    return order;
  }

  async getAllDeliveredOrders(userId: string): Promise<Order[]> {
    const allDeliveredOrders = await this.orderModel.find({
      userId,
      status: 'delivered',
    });

    return allDeliveredOrders;
  }

  async create(req: any, createOrderDto: CreateOrderDto): Promise<Order[]> {
    const userId = req._id;
    const userData = await this.userService.findUser(userId);
    const userCart = await this.cartService.getCart(userId);
    const selectedProductIds = createOrderDto.productId;

    const selectedProducts = await this.productService.findProductById(
      selectedProductIds,
    );

    let subTotal = 0;
    const orders: Order[] = [];
    const productsByMerchant = new Map<string, any[]>();
    const currentTimestamp = new Date();

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
      const merchantId = selectedProduct.merchantID.toString();
      if (!productsByMerchant.has(merchantId)) {
        productsByMerchant.set(merchantId, []);
      }
      productsByMerchant.get(merchantId).push(selectedProduct);
    }
    for (const [merchantId, products] of productsByMerchant) {
      const totalShippingFee = createOrderDto.shippingFee;
      const orderedItems = products.map((product) => ({
        productId: product._id,
        productName: product.productName,
        price: product.productPrice,
        quantity: userCart.orderedItems.find(
          (item) => item.productId === product._id.toString(),
        ).quantity,
        subtotal:
          product.productPrice *
          userCart.orderedItems.find(
            (item) => item.productId === product._id.toString(),
          ).quantity,
      }));

      const orderTotal = orderedItems.reduce(
        (total, item) => total + item.subtotal,
        0,
      );
      const order = {
        ...createOrderDto,
        userId,
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
        orderedItems,
        totalAmount: orderTotal + totalShippingFee,
        shippingFee: totalShippingFee,
        merchantId: merchantId,
        timestamp: {
          orderedAt: currentTimestamp,
        },
      };
      const userOrder = await this.orderModel.create(order);
      orders.push(userOrder);

      // Remove items from Cart
      for (const product of products) {
        await this.cartService.removeItemFromCart(req, product._id);
      }
    }
    return orders;
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

      order.status = 'cancelled';
      await order.save();

      return order;
    }

    throw new BadRequestException('Invalid order status for cancellation');
  }
}
