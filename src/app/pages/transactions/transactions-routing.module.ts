import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsComponent } from './transactions.component';
import { ListComponent } from './list/list.component';
import { PayoutListComponent } from './payout/list/list.component';
import { PayoutSaveComponent } from './payout/edit/save.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent,
    children: [
      // {
      //   path: 'add',
      //   component: SaveComponent,
      // },
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'payouts/list',
        component: PayoutListComponent,
      },
      {
        path: 'payouts/edit/:id',
        component: PayoutSaveComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class TransactionsRoutingModule {
}

export const routedComponents = [
  TransactionsComponent, 
  ListComponent,
  PayoutListComponent,
  PayoutSaveComponent
];


