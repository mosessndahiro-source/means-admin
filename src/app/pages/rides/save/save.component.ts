import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, map, concatMap, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/filter';

import { Ride } from '../../../@core/models/ride/ride';
import { RideRequest } from '../../../@core/models/ride/ride.request';
import { RideError } from '../../../@core/models/ride/ride.error';
import { CoreService } from '../../../@core/service/core.service';
import { ToastStatus } from '../../../@core/service/toast.service';
import { Observable, empty, of } from 'rxjs';
import { RideClient } from '../../../@core/network/ride-client.service';
import { FormGroup, FormArray } from '@angular/forms';
import { Category } from '../../../@core/models/category/category';
import { CategoryClient } from '../../../@core/network/category-client.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'save',
  templateUrl: './save.component.html',
})
export class SaveComponent implements OnInit, IsEditable {
  apiLoaded: Observable<boolean>;
  @ViewChild("googleMap", { static: false }) public googleMap: any;

  ride: Ride = new Ride();
  rideRequest: RideRequest = new RideRequest();
  rideError: RideError = new RideError();
  showProgress: boolean = false;
  showProgressButton: boolean = false;
  categories: Array<Category> = [];
  rideStatusList: Array<string> = ['pending', 'accepted', 'onway', 'ongoing', 'complete', 'cancelled', 'rejected'];
  editId = null;

  constructor(private client: RideClient, public coreService: CoreService, public route: ActivatedRoute,
    public categoryClient: CategoryClient, httpClient: HttpClient) {
    let mapsApiKey = coreService.appConfigService.getConfig().mapsApiKey;
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=' + mapsApiKey, 'callback')
      .pipe(
        map(() => {
          return true;
        }),
        catchError(() => of(false)),
      );

  }

  ngOnInit() {
    this.getEditData();
  }

  getEditData() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId = id;
      this.getDataById(id).subscribe();
    }
  }

  getDataById(id: string): Observable<Ride> {
    this.showProgress = true;
    return this.client.show(id).pipe(
      map((response) => {
        this.showProgress = false;
        this.ride = response;
        this.rideRequest.status = this.ride.status;

        // this.setMapBounds();

        return response;
      }
      ))
  }

  saveRide() {
    this.showProgressButton = true;

    const formData: FormData = new FormData();
    formData.append('status', this.rideRequest.status);

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
          this.rideError.status = errors?.status;
        }
      },
    );
  }

  back() {
    this.coreService.location.back();
  }

  parseFloat(number) {
    return parseFloat(number);
  }

  // setMapBounds() {
  //   const bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds();
  //   bounds.extend(new google.maps.LatLng(parseFloat(this.ride.address.latitude), parseFloat(this.ride.address.longitude)));
  //   bounds.extend(new google.maps.LatLng(parseFloat(this.ride.vendor.latitude), parseFloat(this.ride.vendor.longitude)));
  //   if (this.ride.delivery?.delivery?.latitude) {
  //     bounds.extend(new google.maps.LatLng(parseFloat(this.ride.delivery?.delivery?.latitude), parseFloat(this.ride.delivery?.delivery?.longitude)));
  //   }
  //   this.googleMap.fitBounds(bounds);
  // }

  // onBoundsChanged() {
  //   if(this.googleMap.getZoom() > 13) {
  //     this.googleMap.zoom = 13;
  //   }
  // }
}
