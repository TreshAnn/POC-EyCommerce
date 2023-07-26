import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsAlpha,
  IsStrongPassword,
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

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
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
  @IsString()
  readonly phoneNumber: string;

  readonly userType: string;
}
