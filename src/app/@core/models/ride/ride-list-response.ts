import {Ride} from './ride';
import {BaseListResponse} from '../base-list.response';

export class RideListResponse extends BaseListResponse {
  data: Array<Ride>;
}
