import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsNumber,
  Matches,
} from 'class-validator';
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
  readonly productImg: ImageDto;

  @IsNotEmpty()
  @IsString()
  @Matches(/^product\d{5}$/, {
    message: 'ProductID must be product + 5 digit number',
  })
  readonly productID: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\S(?:.*\S)?$/, {
    message: 'Product Name must not have trailing and leading spaces',
  })
  readonly productName: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\S(?:.*\S)?$/, {
    message: 'Product Information must not have trailing and leading spaces',
  })
  readonly productInfo: string;

  @IsNumber()
  @IsNotEmpty()
  readonly productPrice: number;

  @IsNumber()
  @IsNotEmpty()
  readonly productInventory: number;

  @IsNotEmpty()
  @IsArray()
  @Matches(/^\S(?:.*\S)?$/, {
    each: true,
    message: 'Product Category must not have trailing and leading spaces',
  })
  readonly productCategory: string[];
}
