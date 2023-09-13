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

@Injectable()
export class RatingService {
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

    // get user order
    const userOrder = await this.orderService.getUserOrder(userId);

    // check if productId exists in userOrder
    const itemIndex = userOrder.orderedItems.findIndex(
      (item) => item.productId === createRatingDto.productId,
    );

    if (itemIndex === -1) {
      throw new NotFoundException('Item not found in order');
    }

    if (itemIndex > -1) {
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
