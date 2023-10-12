import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { isValidRating } from 'src/utils/custom-validations.utils';

export class CreateRatingDto {
  @IsNotEmpty()
  readonly productId: string;

  @IsNotEmpty()
  @IsNumber()
  @isValidRating()
  readonly rating: number;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  readonly orderId;
}
