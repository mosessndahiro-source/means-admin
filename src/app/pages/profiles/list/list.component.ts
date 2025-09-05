import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { BaseListComponent } from '../../../@core/components/base-list.component';
import { TranslationService } from '../../../@core/service/translation.service';
import { CoreService } from '../../../@core/service/core.service';
import { ListDataSource } from '../../../@core/network/list-data-source';
import { ProfileClient } from '../../../@core/network/profile-client.service';
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
      key: 'user',
      translation_key: 'PROFILE.FIELDS.USER.LABEL',
      column: {
        title: "",
        type: "string",
        valuePrepareFunction: (user) => {
          return user.mobile_number;
        },
      }
    }
  ];
  editPageUrl = 'pages/profiles/edit';

  constructor(public client: ProfileClient, public coreService: CoreService, public route: ActivatedRoute) {
    super(coreService);
  }

  ngOnInit(): void {
    super.ngOnInit(this.client.getBaseEndpoint());
  }
}
