import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { routedComponents, RidesRoutingModule } from './rides-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    ThemeModule,
    RidesRoutingModule,
    GoogleMapsModule
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class RidesModule { }
