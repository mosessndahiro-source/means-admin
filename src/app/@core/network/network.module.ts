import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import { AdminConfigClient } from './adminconfig-client.service';
import { ListDataSource } from './list-data-source';
import { UserClient } from './user-client.service';
import { CategoryClient } from './category-client.service';
import { PaymentmethodClient } from './paymentmethod-client.service';
import { SettingClient } from './setting-client.service';
import { FaqClient } from './faq-client.service';
import { SupportClient } from './support-client.service';
import { DashboardClient } from './dashboard-client.service';
import { WalletClient } from './wallet-client.service';
import { BannerClient } from './banner-client.service';
import { ProfileClient } from './profile-client.service';
import { CouponClient } from './coupon-client.service';
import { RideClient } from './ride-client.service';

const SERVICES = [
  ListDataSource,
  AdminConfigClient,
  UserClient,
  CategoryClient,
  PaymentmethodClient,
  SettingClient,
  FaqClient,
  SupportClient,
  DashboardClient,
  WalletClient,
  BannerClient,
  ProfileClient,
  CouponClient,
  RideClient
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class NetworkModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: NetworkModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
