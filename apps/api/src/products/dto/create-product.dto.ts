import { IsNotEmpty, IsString, IsArray } from 'class-validator';
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

  @IsString()
  @IsNotEmpty()
  readonly productPrice: string;

  @IsString()
  @IsNotEmpty()
  readonly productInventory: string;

  @IsNotEmpty()
  @IsArray()
  readonly productCategory: string[];
}
