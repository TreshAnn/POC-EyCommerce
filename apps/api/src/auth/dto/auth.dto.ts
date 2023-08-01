import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  readonly userType: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

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
}

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
