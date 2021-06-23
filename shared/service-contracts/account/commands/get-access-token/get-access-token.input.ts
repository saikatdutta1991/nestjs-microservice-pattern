import { IsNotEmpty } from 'class-validator';

export class GetAccessTokenInput {
  @IsNotEmpty()
  refreshToken: string;
}
