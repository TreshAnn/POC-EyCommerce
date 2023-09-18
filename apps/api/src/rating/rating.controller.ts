import {
  Body,
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { Rating } from './schemas/rating.schema';
import { CreateRatingDto } from './dto/create-rating.dto';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async create(
    @Req() req: any,
    @Body() createRatingDto: CreateRatingDto,
  ): Promise<Rating> {
    return await this.ratingService.createOrderRating(req, createRatingDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('')
  async getUserRatings(@Req() req: any): Promise<Rating[]> {
    return await this.ratingService.getUserRatings(req);
  }
}