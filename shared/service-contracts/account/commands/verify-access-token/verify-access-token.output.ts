import { AccountRoles } from '../../account-roles.';

export class VerifyAccessTokenOutput {
  accountId: string;
  username: string;
  role: AccountRoles;
  iat: number;
  exp: number;
}
