import { IsNotEmpty } from 'class-validator';

export class VerifyAccessTokenInput {
  @IsNotEmpty()
  accessToken: string;
}
