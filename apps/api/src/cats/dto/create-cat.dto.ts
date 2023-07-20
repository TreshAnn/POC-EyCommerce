import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateCatDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  @Min(1, {
    message: 'Age should be 1-100',
  })
  @Max(100, {
    message: 'Age should be 1-100',
  })
  readonly age: number;

  @IsString()
  readonly breed: string;
}
