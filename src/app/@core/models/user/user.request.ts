export class UserRequest {
  name: string;
  email: string;
  image: File;
  mobile_number: string;
  password: string;
  roles: Array<string>;
  mobile_verified: number = 0;
  language: string;
  balance: number = 0;
  meta: any = {'company_name': '', 'company_email': '', 'government_id': '', 'license': '', 'hobbies': '', 'bio': '', 'government_id_verified': 0, 'license_verified': 0};
}
