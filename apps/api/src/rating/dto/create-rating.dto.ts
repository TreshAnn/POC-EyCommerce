import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { isValidRating } from 'src/utils/custom-validations.utils';

export class CreateRatingDto {
  @IsNotEmpty()
  readonly productId: string;

  @IsNotEmpty()
  @IsNumber()
  @isValidRating()
  readonly rating: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;
}
