import { Body, Controller, Post, Req } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingService: RatingsService) {}

  @Post()
  async create(@Req() req: any, @Body() createRatingDto: CreateRatingDto) {
    const rating = await this.ratingService.create(req, createRatingDto);
    return rating;
  }
}
