import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async create(@Req() req: any, @Body() createRatingDto: CreateRatingDto) {
    const createdRating = await this.ratingService.create(req, createRatingDto);
    return createdRating;
  }
}
