import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  readonly productId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1, {
    message: 'Rating should be from 1 to 5',
  })
  @Max(5, {
    message: 'Rating should be from 1 to 5',
  })
  readonly rating: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;
}
