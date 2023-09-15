import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  readonly productId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1, {
    message: 'Minimum rating is 1',
  })
  @Max(5, {
    message: 'Maximum rating is 5',
  })
  readonly rating: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;
}
