import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsStrongPassword,
  MinLength,
  Matches,
  IsIn,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import {
  addressHasLeadingTrailingSpaces,
  IsPhoneNumberWithMaxDigits,
} from 'src/utils/custom-validations.utils';

class Address {
  @IsNotEmpty()
  @IsString()
  @addressHasLeadingTrailingSpaces()
  street: string;

  @IsNotEmpty()
  @IsString()
  @addressHasLeadingTrailingSpaces()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'City must contain only alphabetical characters and spaces.',
  })
  city: string;

  @IsNotEmpty()
  @IsString()
  @addressHasLeadingTrailingSpaces()
  region: string;

  @IsNotEmpty()
  @IsNumber()
  zipcode: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Country must contain only alphabetical characters and spaces.',
  })
  country: string;
}

export class CreateMerchantDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['merchant', 'consumer'], {
    message: 'Invalid User Type. Allowed values: "consumer" or "merchant".',
  })
  readonly userType: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z0-9]+$/, {
    message:
      'Username must contain only alphanumeric characters and no spaces.',
  })
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?! )(?!.* $)(?=.*[A-Za-z])^[A-Za-z0-9 ]+$/, {
    message:
      'Merchant name must contain only alphanumeric characters, should not be numbers-only, and cannot have leading or trailing spaces',
  })
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
  @ValidateNested()
  @Type(() => Address)
  readonly address: Address;

  @IsNotEmpty()
  @IsPhoneNumberWithMaxDigits()
  phoneNumber: string;
}

export class UpdateMerchantDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z0-9]+$/, {
    message:
      'Username must contain only alphanumeric characters and no spaces.',
  })
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?! )(?=.*[A-Za-z])([A-Za-z0-9]+)(?<![ ])$/, {
    message:
      'Merchant name must contain only alphanumeric characters, should not be numbers-only, and cannot have leading or trailing spaces',
  })
  readonly merchantName: string;

  @IsNotEmpty()
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
  @ValidateNested()
  @Type(() => Address)
  readonly address: Address;

  @IsNotEmpty()
  @IsPhoneNumberWithMaxDigits()
  phoneNumber: string;
}
