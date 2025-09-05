import {Role} from './role';
import { Wallet } from './wallet';

export class User {
  id: number;
  name: string;
  email: string;
  mobile_number: string;
  roles: Array<Role>;
  mobile_verified: number;
  language: string;
  meta: any;
  notification: any;
  mediaurls: any;
  wallet: Wallet;
  balance: number;
}
