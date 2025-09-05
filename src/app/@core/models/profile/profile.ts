import { Category } from '../category/category';
import { User } from '../user/user';

export class Profile {
    id: string;
    meta: any;
    is_verified: number;
    vehicle_details: any;
    user: User;
}
