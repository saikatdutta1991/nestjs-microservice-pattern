import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SigninAccountInput {
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  password: string;
}
