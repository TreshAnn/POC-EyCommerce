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
import { UpdateRatingDto } from './dto/update-rating.dto';

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

  async createOrderRating(
    req: any,
    createRatingDto: CreateRatingDto,
  ): Promise<Rating> {
    const userId = req._id;
    const authUser = await this.authService.findOne(userId);
    let itemFound = false;
    const allDeliveredOrders = await this.orderService.getAllDeliveredOrders(
      userId,
    );

    for (const order of allDeliveredOrders) {
      const itemIndex = order.orderedItems.findIndex(
        (item) => item.productId === createRatingDto.productId,
      );

      if (itemIndex > -1) {
        itemFound = true;
        const existingRating = await this.ratingModel.findOne({
          userId,
          productId: createRatingDto.productId,
        });

        if (existingRating) {
          throw new BadRequestException(
            'Already provided rating for this product!',
          );
        }

        const now = new Date();

        const rating = {
          ...createRatingDto,
          userId,
          username: authUser.username,
          publishedDate: now,
          reviewDate: now,
        };

        const userRating = await this.ratingModel.create(rating);
        return userRating;
      }
    }

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
    const publishedDate = existingRating.publishedDate;
    const updateTime = new Date(
      publishedDate.getTime() + 60 * 1000, // Add 1 minute
    );

    if (now > updateTime) {
      throw new BadRequestException(
        'You can only update your review within 1 minute of the original review',
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

    existingRating.reviewDate = now;

    const updatedRating = await existingRating.save();
    return updatedRating;
  }
}
