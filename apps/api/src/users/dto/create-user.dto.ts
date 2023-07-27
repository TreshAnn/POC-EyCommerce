import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsAlpha,
  IsStrongPassword,
  MinLength,
  Matches,
  IsPhoneNumber,
  IsIn,
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
  @IsIn(['merchant', 'consumer'], {
    message: 'Invalid User Type. Allowed values: "consumer" or "merchant".',
  })
  readonly userType: string;

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
  @MinLength(8, {
    message: 'Password should be atleast 8 characters',
  })
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, {
    message:
      'First name must contain only alphabetic characters and cannot have leading or trailing spaces',
  })
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, {
    message:
      'Last name must contain only alphabetic characters and cannot have leading or trailing spaces',
  })
  readonly lastName: string;

  @IsNotEmpty()
  readonly address: Address;

  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phoneNumber: string;
}
