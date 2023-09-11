import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  readonly productId: string[];

  @IsNotEmpty()
  @IsNumber()
  shippingFee: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;
}
