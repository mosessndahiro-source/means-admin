import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, map, concatMap } from 'rxjs/operators';
import 'rxjs/add/operator/filter';

import { Profile } from '../../../@core/models/profile/profile';
import { ProfileRequest } from '../../../@core/models/profile/profile.request';
import { ProfileError } from '../../../@core/models/profile/profile.error';
import { CoreService } from '../../../@core/service/core.service';
import { ToastStatus } from '../../../@core/service/toast.service';
import { Observable, empty, of } from 'rxjs';
import { ProfileClient } from '../../../@core/network/profile-client.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Category } from '../../../@core/models/category/category';
import { CategoryClient } from '../../../@core/network/category-client.service';
import { User } from '../../../@core/models/user/user';
import { MetaeditorComponent } from '../../../@theme/components/metaeditor/metaeditor.component';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'save',
  templateUrl: './save.component.html',
})
export class SaveComponent implements OnInit, AfterViewInit, IsEditable {
  @ViewChild(MetaeditorComponent) metaeditorComponent: MetaeditorComponent;

  profile: Profile = new Profile();
  profileRequest: ProfileRequest = new ProfileRequest();
  profileError: ProfileError = new ProfileError();
  showProgress: boolean = false;
  showProgressButton: boolean = false;
  editId = null;

  languages = [];

  groupForm: FormGroup;
  groupFormItems: FormArray;

  constructor(private client: ProfileClient, public coreService: CoreService, public route: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.languages = coreService.translationService.languages;
  }

  ngOnInit() {
    this.groupForm = this.formBuilder.group({
      items: this.formBuilder.array([]),
    });

    if (!this.editId) {
      this.groupFormItems = this.groupForm.get('items') as FormArray;
    }

    this.getEditData();
  }

  ngAfterViewInit() {
  }

  getEditData() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId = id;
      this.getDataById(id).subscribe();
    }
  }

  getDataById(id: string): Observable<Profile> {
    this.showProgress = true;
    return this.client.show(id).pipe(
      map((response) => {
        this.showProgress = false;
        this.profile = response;
        this.profileRequest.vehicle_details = this.profile.vehicle_details ?? this.profileRequest.vehicle_details;
        this.profileRequest.is_verified = this.profile.is_verified;
        this.profileRequest.meta = this.profile.meta;

        return response;
      }
      ))
  }

  saveProfile() {
    this.metaeditorComponent.updatedMetaProperty();

    this.showProgressButton = true;

    const formData: FormData = new FormData();
    formData.append('vehicle_details', JSON.stringify(this.profileRequest.vehicle_details));
    formData.append('is_verified', String(this.profileRequest.is_verified));
    
    formData.append('meta', JSON.stringify(this.profileRequest.meta));

    // user information
    if (!this.editId) {
      formData.append('name', this.profileRequest.name);
      formData.append('email', this.profileRequest.email);
      formData.append('mobile_number', this.profileRequest.mobile_number);
      formData.append('password', this.profileRequest.password);
    }

    let save$ = !this.editId ? this.client.store(formData) : this.client.update(this.editId, formData);

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
          let errors = err.error.errors;
          this.profileError.vehicle_details = errors?.vehicle_details;
          this.profileError.is_verified = errors?.is_verified;
        }
      },
    );
  }

  back() {
    this.coreService.location.back();
  }

  onIsVerifiedChange(value) {
    this.profileRequest.is_verified = value ? 1 : 0;
  }
}
