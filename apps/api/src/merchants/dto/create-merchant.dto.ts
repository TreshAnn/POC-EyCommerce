import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsAlpha,
  IsNumberString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

class Address {
  @IsNotEmpty()
  @IsString()
  readonly street: string;

  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  readonly city: string;

  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  readonly region: string;

  @IsNotEmpty()
  @IsString()
  readonly zipcode: string;

  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  readonly country: string;
}

export class CreateMerchantDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly merchantName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @MinLength(8, {
    message: 'Password should be atleast 8 characters',
  })
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  readonly lastName: string;

  @IsNotEmpty()
  readonly address: Address;

  @IsNotEmpty()
  @IsNumberString()
  readonly phoneNumber: string;

  readonly userType: string;
}
