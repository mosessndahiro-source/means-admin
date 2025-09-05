import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {RideListResponse} from '../models/ride/ride-list-response';

import {Ride} from '../models/ride/ride';
import {BaseClient} from './base-client.service';

@Injectable()
export class RideClient extends BaseClient {

  public getBaseEndpoint() {
    return this.baseEndpoint + '/carpool/rides';
  }

  public list(): Observable<RideListResponse> {
    return this.authService.getToken().pipe(switchMap((token) => {
      return this.http.get<RideListResponse>(this.getBaseEndpoint(),
        {headers: this.getHeaders(token)});
    }));
  }

  public show(id: string): Observable<Ride> {
    return this.authService.getToken().pipe(switchMap((token) => {
      return this.http.get<Ride>(this.getBaseEndpoint() + '/' + id,
        {headers: this.getHeaders(token)});
    }));
  }

  public store(formData: FormData): Observable<Ride> {
    return this.authService.getToken().pipe(switchMap((token) => {
      return this.http.post<Ride>(this.getBaseEndpoint(), formData,
        {headers: this.getHeaders(token, false)});
    }));
  }

  public update(id, formData: FormData): Observable<Ride> {
    formData.append('_method', 'PUT');
    return this.authService.getToken().pipe(switchMap((token) => {
      return this.http.post<Ride>(this.getBaseEndpoint() +  '/' + id, formData,
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
