import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateCatDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNumber()
  @Min(1, {
    message: "Age should be 1-100",
  })
  @Max(100, {
    message: "Age should be 1-100",
  })
  @IsNotEmpty()
  readonly age: number;

  @IsString()
  @IsNotEmpty()
  readonly breed: string;
}
