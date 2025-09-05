import {Profile} from './profile';
import {BaseListResponse} from '../base-list.response';

export class ProfileListResponse extends BaseListResponse {
  data: Array<Profile>;
}
