import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';

import { TrustService } from './trust.service';

import { TrustComponent } from './trust/trust.component';
import { TrustsComponent } from './trusts.component';
import { TrustCenterComponent } from './trust-center/trust-center.component';

@NgModule({
  declarations: [
    TrustComponent,
    TrustsComponent,
    TrustCenterComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    TrustService
  ]
})
export class TrustModule { }
