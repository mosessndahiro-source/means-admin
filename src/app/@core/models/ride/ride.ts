import { Payment } from "../paymentmethod/payment";
import { Profile } from "../profile/profile";
import { User } from "../user/user";

export class Ride {
  id: number;
  meta: any;
  address_from: string;
  latitude_from: string;
  longitude_from: string;
  address_to: string;
  latitude_to: string;
  longitude_to: string;
  ride_on: string;
  seats: string;
  price_per_seat: string;
  profile: Profile;
  status: string;
  payment: Payment;
  created_at: string;
  updated_at: string;
}
