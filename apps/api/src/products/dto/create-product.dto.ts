import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsNumber,
  Matches,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

export class ImageDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^\S(?:.*\S)?$/, {
    message: 'ImgURL must not have trailing and leading spaces',
  })
  ImgURL: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\S(?:.*\S)?$/, {
    message: 'ImgAttch must not have trailing and leading spaces',
  })
  ImgAttch: string;
}

export class CreateProductDto {
  @ValidateNested()
  @Type(() => ImageDto)
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
