import { UserPartialRequest } from '../user/user-partial.request';

export class ProfileRequest extends UserPartialRequest {
    meta: any = {};
    is_verified: number = 0;
    vehicle_details: any = {'type': '', 'name': '', 'reg_number': '', 'facilities': '', 'instructions': ''};
}
