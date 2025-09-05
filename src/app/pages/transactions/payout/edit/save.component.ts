import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, map, concatMap } from 'rxjs/operators';
import 'rxjs/add/operator/filter';

import { Coupon } from '../../../../@core/models/coupon/coupon';
import { CouponRequest } from '../../../../@core/models/coupon/coupon.request';
import { CouponError } from '../../../../@core/models/coupon/coupon.error';
import { CoreService } from '../../../../@core/service/core.service';
import { ToastStatus } from '../../../../@core/service/toast.service';
import { Observable, empty, of } from 'rxjs';
import { FormArray, FormGroup } from '@angular/forms';
import { CouponClient } from '../../../../@core/network/coupon-client.service';
import { MetaeditorComponent } from '../../../../@theme/components/metaeditor/metaeditor.component';
import { Transaction } from '../../../../@core/models/wallet/transaction';
import { WalletClient } from '../../../../@core/network/wallet-client.service';
import { TransactionRequest } from '../../../../@core/models/wallet/transaction.request';

@Component({
  selector: 'save',
  templateUrl: './save.component.html',
})
export class PayoutSaveComponent implements OnInit, IsEditable {
  @ViewChild(MetaeditorComponent) metaeditorComponent: MetaeditorComponent;

  transaction: Transaction = new Transaction();
  transactionRequest: TransactionRequest = new TransactionRequest();
  showProgress: boolean = false;
  showProgressButton: boolean = false;
  isEdit = false;
  editId = null;

  constructor(private client: WalletClient, public coreService: CoreService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getEditData();
  }

  ngAfterViewInit() {
  }

  getEditData() {
    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.editId = id;
      this.getDataById(id).subscribe();
    }
  }

  getDataById(id: string): Observable<Transaction> {
    this.showProgress = true;
    return this.client.show(id).pipe(
      map((response) => {
        this.showProgress = false;
        this.transaction = response;
        this.transactionRequest.is_paid = Number(this.transaction.meta.is_paid) ?? 0;
        return response;
      }
      ))
  }

  saveTransaction() {
    this.showProgressButton = true;

    const formData: FormData = new FormData();
    formData.append('is_paid', String(this.transactionRequest.is_paid));

    let save$ = this.client.update(this.editId, formData);

    save$.subscribe(
      res => {
        this.showProgressButton = false;
        this.coreService.toastService.showToast(ToastStatus.SUCCESS, 'Saved', 'Saved successfully!');
        this.back();
      },
      err => {
        this.showProgressButton = false;
        this.coreService.toastService.showToast(ToastStatus.DANGER, 'Failed', err.error.message);
      },
    );
  }

  onIsPaidChange(value) {
    this.transactionRequest.is_paid = value ? 1 : 0;
  }

  back() {
    this.coreService.location.back();
  }
}
