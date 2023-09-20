import { isValidRating } from 'src/utils/custom-validations.utils';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class UpdateRatingDto {
  @IsNotEmpty()
  @IsNumber()
  @isValidRating()
  readonly rating: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;
}
