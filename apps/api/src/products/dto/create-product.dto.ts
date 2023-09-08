import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsNumber,
  Matches,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  readonly productImg: string[];

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
