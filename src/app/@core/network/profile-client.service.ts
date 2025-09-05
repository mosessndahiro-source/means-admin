import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ProfileListResponse} from '../models/profile/profile-list-response';

import {Profile} from '../models/profile/profile';
import {BaseClient} from './base-client.service';

@Injectable()
export class ProfileClient extends BaseClient {

  public getBaseEndpoint() {
    return this.baseEndpoint + '/carpool/profiles';
  }

  public list(): Observable<ProfileListResponse> {
    return this.authService.getToken().pipe(switchMap((token) => {
      return this.http.get<ProfileListResponse>(this.getBaseEndpoint(),
        {headers: this.getHeaders(token)});
    }));
  }

  public show(id: string): Observable<Profile> {
    return this.authService.getToken().pipe(switchMap((token) => {
      return this.http.get<Profile>(this.getBaseEndpoint() + '/' + id,
        {headers: this.getHeaders(token)});
    }));
  }

  public store(formData: FormData): Observable<Profile> {
    return this.authService.getToken().pipe(switchMap((token) => {
      return this.http.post<Profile>(this.getBaseEndpoint(), formData,
        {headers: this.getHeaders(token, false)});
    }));
  }

  public update(id, formData: FormData): Observable<Profile> {
    formData.append('_method', 'PUT');
    return this.authService.getToken().pipe(switchMap((token) => {
      return this.http.post<Profile>(this.getBaseEndpoint() +  '/' + id, formData,
        {headers: this.getHeaders(token, false)});
    }));
  }

  public delete(id): Observable<any> {
    return this.authService.getToken().pipe(switchMap((token) => {
      return this.http.delete<any>(this.getBaseEndpoint() + '/' + id,
        {headers: this.getHeaders(token)});
    }));
  }
}
