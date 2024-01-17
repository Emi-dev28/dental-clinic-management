import { IsEmail, IsStrongPassword } from 'class-validator';

export class UserDTO {
  id?: number;
  @IsEmail()
  email: string;
  @IsStrongPassword()
  password: string;
}
