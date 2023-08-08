import {
  IsNotEmpty,
  IsString,
  Matches,
  IsIn,
  IsNumber,
  IsObject,
} from 'class-validator';

export class ItemDto {
  @IsNotEmpty()
  @IsString()
  productID: string;

  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsObject()
  productImg: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  productPrice: number;
}
