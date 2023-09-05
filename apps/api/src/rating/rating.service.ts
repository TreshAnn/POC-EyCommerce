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
import { CartService } from 'src/cart/cart.service';
import { Rating } from './schemas/rating.schema';

import { extractIdFromToken } from 'src/utils/extract-token.utils';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating.name) private readonly ratingModel: Model<Rating>,
    private jwtService: JwtService,
    private authService: AuthService,
    private cartService: CartService,
  ) {}

  async getUserRatings(reqHeader: any): Promise<Rating[]> {
    const userId = await extractIdFromToken(reqHeader, this.jwtService);

    return this.ratingModel.find({ userId });
  }

  async create(
    reqHeader: any,
    createRatingDto: CreateRatingDto,
  ): Promise<Rating> {
    const userId = await extractIdFromToken(reqHeader, this.jwtService);

    const authUser = await this.authService.findOne(userId);

    const userCart = await this.cartService.getCart(userId);

    // note: tested for cart product while waiting for order API, will change later
    // check if productId exists in cart
    const itemIndex = userCart.orderedItems.findIndex(
      (item) => item.productID === createRatingDto.productId,
    );
    if (itemIndex === -1) {
      throw new NotFoundException('Item not found in cart');
    }

    if (itemIndex > -1) {
      // check if the user has already provided a rating for the product
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
