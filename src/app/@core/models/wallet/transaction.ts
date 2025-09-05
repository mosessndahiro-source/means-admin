
import { User } from '../user/user';

export class Transaction {
    id: number;
    amount: number;
    type: string;
    meta: any;
    created_at: string;
    user: User;
}