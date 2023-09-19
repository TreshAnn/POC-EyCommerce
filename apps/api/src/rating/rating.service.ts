import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRatingDto } from './dto/create-rating.dto';

import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { Rating } from './schemas/rating.schema';

import { OrderService } from 'src/order/order.service';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating.name) private readonly ratingModel: Model<Rating>,
    private jwtService: JwtService,
    private authService: AuthService,
    private orderService: OrderService,
  ) {}

  async getUserRatings(req: any): Promise<Rating[]> {
    const userId = req._id;

    return this.ratingModel.find({ userId });
  }

  async getProductRatings(productId: string): Promise<Rating[]> {
    const productRatings = await this.ratingModel.find({
      productId: productId,
    });

    if (productRatings.length === 0) {
      throw new NotFoundException('Product has 0 reviews');
    }

    return productRatings;
  }

  async createOrderRating(
    req: any,
    createRatingDto: CreateRatingDto,
  ): Promise<Rating> {
    const userId = req._id;

    const authUser = await this.authService.findOne(userId);

    // flag to check if the item is found
    let itemFound = false;

    // get all delivered orders
    const allDeliveredOrders = await this.orderService.getAllDeliveredOrders(
      userId,
    );

    // for loop of allDeliveredOrders
    for (const order of allDeliveredOrders) {
      const itemIndex = order.orderedItems.findIndex(
        (item) => item.productId === createRatingDto.productId,
      );

      if (itemIndex > -1) {
        // set flag to true if item is found
        itemFound = true;

        // check if user has already provided a rating for the ordered product
        const existingRating = await this.ratingModel.findOne({
          userId,
          productId: createRatingDto.productId,
        });

        if (existingRating) {
          throw new BadRequestException(
            'Already provided rating for this product!',
          );
        }

        const rating = {
          ...createRatingDto,
          userId,
          username: authUser.username,
        };

        const userRating = await this.ratingModel.create(rating);
        return userRating;
      }
    }

    // throw exception if item is not found in order
    if (!itemFound) {
      throw new NotFoundException('Product not found in delivered order');
    }
  }
}
