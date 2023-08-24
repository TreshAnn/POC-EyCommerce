import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1, {
    message: 'Rating should be from 1-5',
  })
  @Max(5, {
    message: 'Rating should be from 1-5',
  })
  rating: number;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
