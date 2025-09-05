import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {BaseClient} from './base-client.service';
import {UserListResponse} from '../models/user/user-list-response';
import {User} from '../models/user/user';
import {Role} from '../models/user/role';
import { Transaction } from '../models/wallet/transaction';

@Injectable()
export class WalletClient extends BaseClient {
  
  public getBaseEndpoint() {
    return this.baseEndpoint + '/wallet';
  }

  public transactions(): Observable<UserListResponse> {
    return this.authService.getToken().pipe(switchMap((token) => {
      return this.http.get<UserListResponse>(this.getBaseEndpoint() + '/transactions',
        {headers: this.getHeaders(token)});
    }));
  }

  public show(id: string): Observable<Transaction> {
    return this.authService.getToken().pipe(switchMap((token) => {
      return this.http.get<Transaction>(this.getBaseEndpoint() + '/transactions/' + id,
        {headers: this.getHeaders(token)});
    }));
  }

  public update(id, formData: FormData): Observable<User> {
    formData.append('_method', 'PUT');
    return this.authService.getToken().pipe(switchMap((token) => {
      return this.http.post<User>(this.getBaseEndpoint() + '/transactions/' + id, formData,
        {headers: this.getHeaders(token, false)});
    }));
  }
}
