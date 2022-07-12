import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsEmailAlreadyExist } from '../IsEmailAlreadyExist.constraint';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsEmailAlreadyExist({ message: 'E-mail already exist' })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password has to be at least 6 characters' })
  password: string;
}
