import { AccountType } from '../../account-type.';

export class CreateAccountOutput {
  type: AccountType;
  username: string;
  name: string;
  passwordHash: string;
  refreshToken: string;
}
