import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, map, concatMap } from 'rxjs/operators';
import 'rxjs/add/operator/filter';

import { User } from '../../../@core/models/user/user';
import { UserRequest } from '../../../@core/models/user/user.request';
import { UserError } from '../../../@core/models/user/user.error';
import { UserClient } from '../../../@core/network/user-client.service';
import { Role } from '../../../@core/models/user/role';
import { CoreService } from '../../../@core/service/core.service';
import { ToastStatus } from '../../../@core/service/toast.service';
import { Observable, empty, of } from 'rxjs';

@Component({
  selector: 'save',
  templateUrl: './save.component.html',
})
export class SaveComponent implements OnInit, IsEditable {

  user: User = new User();
  userRoles: Array<Role> = [];
  userRequest: UserRequest = new UserRequest();
  userError: UserError = new UserError();
  showProgress: boolean = false;
  showProgressButton: boolean = false;
  isEdit = false;
  editId = null;

  constructor(private client: UserClient, public coreService: CoreService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getRoles().subscribe();

    this.getEditData();
  }

  getRoles(): Observable<Array<Role>> {
    return this.client.roles().pipe(
      map(
        (response) => {
          this.userRoles = response;
          return response;
        },
      ));
  }

  getEditData() {
    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.editId = id;
      this.getDataById(id).subscribe();
    }
  }

  getDataById(id: string): Observable<User> {
    this.showProgress = true;
    return this.client.show(id).pipe(
      map((response) => {
        this.showProgress = false;
        this.user = response;
        this.userRequest.name = this.user.name;
        this.userRequest.email = this.user.email;
        this.userRequest.mobile_number = this.user.mobile_number;
        this.userRequest.roles = [];
        let selectedRoles = [];
        for (let i = 0; i < this.user.roles.length; i++) {
          selectedRoles.push(this.user.roles[i].name);
        }
        this.userRequest.roles = selectedRoles;
        this.userRequest.language = this.user.language;
        this.userRequest.mobile_verified = this.user.mobile_verified;
        this.userRequest.balance = this.user.wallet.balance;
        this.userRequest.meta = this.user.meta ?? this.userRequest.meta;
        return response;
      }
      ))
  }

  saveUser() {
    console.log(this.userRequest.meta);
    
    this.showProgressButton = true;

    const formData: FormData = new FormData();
    formData.append('name', this.userRequest.name);
    formData.append('email', this.userRequest.email);
    formData.append('mobile_number', this.userRequest.mobile_number);
    formData.append('password', this.userRequest.password);
    formData.append('mobile_verified', String(this.userRequest.mobile_verified));
    formData.append('language', this.userRequest.language);
    formData.append('balance', String(this.userRequest.balance));

    let meta = this.userRequest.meta ?? {};
    console.log(this.userRequest.meta, meta, JSON.stringify(meta));
    // Object.assign(meta, { 'profile': this.userRequest.profile });
    formData.append('meta', JSON.stringify(meta));

    for (let i = 0; i < this.userRequest.roles.length; i++) {
      formData.append('roles[]', this.userRequest.roles[i]);
    }

    if (this.userRequest.image) {
      formData.append('image', this.userRequest.image);
    }

    let save$ = !this.isEdit ? this.client.store(formData) : this.client.update(this.editId, formData);

    save$.subscribe(
      res => {
        this.showProgressButton = false;
        this.coreService.toastService.showToast(ToastStatus.SUCCESS, 'Saved', 'Saved successfully!');
        this.back();
      },
      err => {
        this.showProgressButton = false;
        this.coreService.toastService.showToast(ToastStatus.DANGER, 'Failed', err.error.message);
        if (err.error.errors) {
          if (err.error.errors.name) {
            this.userError.name = err.error.errors.name;
          }
          if (err.error.errors.image) {
            this.userError.image = err.error.errors.image;
          }
          if (err.error.errors.email) {
            this.userError.email = err.error.errors.email;
          }
          if (err.error.errors.mobile_number) {
            this.userError.mobile_number = err.error.errors.mobile_number;
          }
          if (err.error.errors.password) {
            this.userError.password = err.error.errors.password;
          }
          if (err.error.errors.roles) {
            this.userError.roles = err.error.errors.role;
          }
          if (err.error.errors.balance) {
            this.userError.balance = err.error.errors.balance;
          }
        }
      },
    );
  }

  back() {
    this.coreService.location.back();
  }

  formatRole(role) {
    switch (role) {
      default:
        return role;
    }
  }

  onMobileVerifiedChange(value) {
    this.userRequest.mobile_verified = value ? 1 : 0;
  }

  onImageChanged(event) {
    const file = event.target.files[0];
    this.userRequest.image = file;
  }
}
