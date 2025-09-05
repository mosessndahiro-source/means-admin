import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from '../../../../@core/components/base-list.component';
import { CoreService } from '../../../../@core/service/core.service';
import { WalletClient } from '../../../../@core/network/wallet-client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class PayoutListComponent extends BaseListComponent implements OnInit {
  columns = [
    {
      key: 'user',
      translation_key: 'PAYOUTS.FIELDS.USER.LABEL',
      column: {
        title: "",
        type: "string",
        filter: false,
        valuePrepareFunction: (user) => {
          return user.email;
        },
      }
    },
    {
      key: 'amount',
      translation_key: 'PAYOUTS.FIELDS.AMOUNT.LABEL',
      column: {
        filter: false,
        title: "",
        type: "string"
      }
    },
    {
      key: 'meta',
      translation_key: 'PAYOUTS.FIELDS.IS_PAID.LABEL',
      column: {
        filter: false,
        title: "",
        type: "string",
        valuePrepareFunction: (meta) => {
          return meta?.is_paid && meta.is_paid == '1' ? 'YES' : 'NO';
        },
      }
    },
  ];
  editPageUrl = 'pages/transactions/payouts/edit';

  constructor(public client: WalletClient, public coreService: CoreService, public route: ActivatedRoute) {
    super(coreService);
    this.actionSettings = {
      actions: {
        columnTitle: 'Action',
        position: 'right',
        add: false,
        edit:true,
        delete: false
      }
    };
  }

  ngOnInit(): void {
    super.ngOnInit(this.client.getBaseEndpoint() + '/transactions?type=payout');
  }

  delete(event) {
    super.delete(event);
  }
}
