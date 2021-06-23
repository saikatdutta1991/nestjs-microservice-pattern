import { IsMongoId, IsNotEmpty } from 'class-validator';

export class GetAccountInput {
  @IsMongoId()
  @IsNotEmpty()
  accountId: string;
}
