import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { AuthGuard } from '../auth.guard';
import { ECommerceComponent } from './e-commerce/e-commerce.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'users',
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: 'categories',
      loadChildren: () => import('./categories/categories.module')
        .then(m => m.CategoriesModule),
    },
    {
      path: 'banners',
      loadChildren: () => import('./banners/banners.module')
        .then(m => m.BannersModule),
    },
    {
      path: 'coupons',
      loadChildren: () => import('./coupons/coupons.module')
        .then(m => m.CouponsModule),
    },
    {
      path: 'profiles',
      loadChildren: () => import('./profiles/profiles.module')
        .then(m => m.ProfilesModule),
    },
    {
      path: 'rides',
      loadChildren: () => import('./rides/rides.module')
        .then(m => m.RidesModule),
    },
    {
      path: 'transactions',
      loadChildren: () => import('./transactions/transactions.module')
        .then(m => m.TransactionsModule),
    },
    {
      path: 'paymentmethods',
      loadChildren: () => import('./paymentmethods/paymentmethods.module')
        .then(m => m.PaymentmethodsModule),
    },
    {
      path: 'faqs',
      loadChildren: () => import('./faqs/faqs.module')
        .then(m => m.FaqsModule),
    },
    {
      path: 'supports',
      loadChildren: () => import('./supports/support.module')
        .then(m => m.SupportsModule),
    },
    {
      path: 'settings',
      loadChildren: () => import('./settings/settings.module')
        .then(m => m.SettingsModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      redirectTo: 'dashboard',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
