import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { BaseListComponent } from '../../../@core/components/base-list.component';
import { TranslationService } from '../../../@core/service/translation.service';
import { CoreService } from '../../../@core/service/core.service';
import { ListDataSource } from '../../../@core/network/list-data-source';
import { RideClient } from '../../../@core/network/ride-client.service';
import { ToastStatus } from '../../../@core/service/toast.service';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../../../@core/models/constants.model';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseListComponent implements OnInit {
  columns = [
    {
      key: 'id',
      translation_key: 'RIDE.FIELDS.ID.LABEL',
      column: {
        title: "",
        type: "string"
      }
    },
    {
      key: 'profile',
      translation_key: 'RIDE.FIELDS.PROFILE.LABEL',
      column: {
        title: "",
        type: "string",
        valuePrepareFunction: (profile) => {
          return profile.user.mobile_number;
        },
      }
    },
    {
      key: 'status',
      translation_key: 'RIDE.FIELDS.STATUS.LABEL',
      column: {
        title: "",
        type: "string"
      }
    },
    {
      key: 'price_per_seat',
      translation_key: 'RIDE.FIELDS.PRICE.LABEL',
      column: {
        title: "",
        type: "string",
        filter: false
      }
    }
  ];
  editPageUrl = 'pages/rides/edit';

  constructor(public client: RideClient, public coreService: CoreService, public route: ActivatedRoute) {
    super(coreService);
  }

  ngOnInit(): void {
    super.ngOnInit(this.client.getBaseEndpoint());
  }
}
