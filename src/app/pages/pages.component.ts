import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { CoreService } from '../@core/service/core.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu = MENU_ITEMS;

  constructor(private coreService: CoreService) {
  }

  ngOnInit(): void {
    this.translateMenuItems();
  }

  translateMenuItems() {
    for (let i = 0; i < this.menu.length; i++) {
      this.coreService.translateService.get(this.menu[i].title).subscribe(_ => {
        this.menu[i].title = _;
      });

      if(this.menu[i].children) {
        for (let j = 0; j < this.menu[i].children.length; j++) {
          this.coreService.translateService.get(this.menu[i].children[j].title).subscribe(_ => {
            this.menu[i].children[j].title = _;
          });
        }
      }
    }
  }
}
