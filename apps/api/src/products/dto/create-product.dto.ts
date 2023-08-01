import { IsNotEmpty, IsString, IsArray, IsNumber } from 'class-validator';
export class ImageDto {
  @IsNotEmpty()
  @IsString()
  ImgURL: string;

  @IsNotEmpty()
  @IsString()
  ImgAttch: string;
}
export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly productID: string;

  @IsNotEmpty()
  readonly productImg: ImageDto;

  @IsString()
  @IsNotEmpty()
  readonly productName: string;

  @IsString()
  @IsNotEmpty()
  readonly productInfo: string;

  @IsNumber()
  @IsNotEmpty()
  readonly productPrice: number;

  @IsNumber()
  @IsNotEmpty()
  readonly productInventory: number;

  @IsNotEmpty()
  @IsArray()
  readonly productCategory: string[];
}
