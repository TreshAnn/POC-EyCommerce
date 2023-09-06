import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  readonly productID: string;

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
