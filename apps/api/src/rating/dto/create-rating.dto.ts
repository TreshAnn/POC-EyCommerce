import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  isValidRating,
  isValidRatingTitle,
  isValidRatingDescription,
} from 'src/utils/custom-validations.utils';

export class CreateRatingDto {
  @IsNotEmpty()
  readonly productId: string;

  @IsNotEmpty()
  @IsNumber()
  @isValidRating()
  readonly rating: number;

  @IsString()
  @isValidRatingTitle()
  readonly title: string;

  @IsString()
  @isValidRatingDescription()
  readonly description: string;

  readonly orderId;
}
