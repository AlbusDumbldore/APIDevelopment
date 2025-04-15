import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(7)
  password: string;

  @IsString()
  @MinLength(5)
  username: string;
}
