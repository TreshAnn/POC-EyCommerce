import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ItemDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  productImg: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  productPrice: number;

  productInventory: number;
}
