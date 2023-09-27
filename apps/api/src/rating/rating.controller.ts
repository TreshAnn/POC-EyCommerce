import {
  Body,
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  Param,
  Put,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { Rating } from './schemas/rating.schema';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { UsersService } from 'src/users/users.service';

@Controller('rating')
export class RatingController {
  constructor(
    private readonly ratingService: RatingService,
    private readonly userService: UsersService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/:id')
  async createRating(
    @Req() req: any,
    @Param('id') id: string,
    @Body() createRatingDto: CreateRatingDto,
  ): Promise<Rating> {
    return await this.ratingService.createRating(req._id, id, createRatingDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getProductRatings(@Param('id') productId: string): Promise<Rating[]> {
    return await this.ratingService.getProductRatings(productId);
  }

  @HttpCode(HttpStatus.OK)
  @Get('')
  async getUserRatings(@Req() req: any): Promise<Rating[]> {
    return await this.ratingService.getUserRatings(req);
  }

  @HttpCode(HttpStatus.OK)
  @Put('/update/:id')
  async updateRating(
    @Param('id') ratingId: string,
    @Body() updatedRatingDto: UpdateRatingDto,
  ): Promise<Rating> {
    return await this.ratingService.updateRating(ratingId, updatedRatingDto);
  }
}
