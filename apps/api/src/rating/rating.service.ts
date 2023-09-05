import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRatingDto } from './dto/create-rating.dto';

import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { Rating } from './schemas/rating.schema';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating.name) private readonly ratingModel: Model<Rating>,
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async create(
    reqHeader: any,
    createRatingDto: CreateRatingDto,
  ): Promise<Rating> {
    const userId = await this.extractIdFromToken(reqHeader);

    const authUser = await this.authService.findOne(userId);

    const username = authUser.username;

    const rating = {
      ...createRatingDto,
      userId,
      username,
    };

    const userRating = await this.ratingModel.create(rating);
    return userRating;
  }

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
