import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateAccountInput {
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  username: string;

  @IsOptional()
  name?: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  password: string;
}
