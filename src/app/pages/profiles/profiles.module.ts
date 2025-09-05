import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { routedComponents, ProfilesRoutingModule } from './profiles-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    ProfilesRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class ProfilesModule { }
