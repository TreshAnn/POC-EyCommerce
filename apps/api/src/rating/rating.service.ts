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

import { extractIdFromToken } from 'src/utils/extract-token.utils';
import { OrderService } from 'src/order/order.service';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingService {
  // updateRating(
  //   ratingId: string,
  //   updatedRatingDto: UpdateRatingDto,
  // ): Rating | PromiseLike<Rating> {
  //   throw new Error('Method not implemented.');
  // }
  constructor(
    @InjectModel(Rating.name) private readonly ratingModel: Model<Rating>,
    private jwtService: JwtService,
    private authService: AuthService,
    private orderService: OrderService,
  ) {}

  async getUserRatings(req: any): Promise<Rating[]> {
    const userId = await extractIdFromToken(req, this.jwtService);

    return this.ratingModel.find({ userId });
  }

  async createOrderRating(
    req: any,
    createRatingDto: CreateRatingDto,
  ): Promise<Rating> {
    const userId = await extractIdFromToken(req, this.jwtService);

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

  async updateRating(
    ratingId: string,
    updatedRatingDto: UpdateRatingDto,
  ): Promise<Rating> {
    const existingRating = await this.ratingModel.findById(ratingId);
    if (!existingRating) {
      throw new NotFoundException('Rating not found');
    }

    const now = new Date();
    const reviewDate = existingRating.reviewDate;
    const updateTime = new Date();
    updateTime.setTime(updateTime.getTime() - 2 * 60 * 1000); // 2 minutes for testing only
    //for 5 days updateTime.setDate(updateTime.getDate() - 5);

    if (reviewDate < updateTime) {
      throw new BadRequestException(
        'You can only update your review within 2 minutes of the original review',
      );
    }

    if (updatedRatingDto.rating !== undefined) {
      existingRating.rating = updatedRatingDto.rating;
    }
    if (updatedRatingDto.title !== undefined) {
      existingRating.title = updatedRatingDto.title;
    }
    if (updatedRatingDto.description !== undefined) {
      existingRating.description = updatedRatingDto.description;
    }
    const updatedRating = await existingRating.save();
    return updatedRating;
  }
}
