import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';

import { FluxComponent } from './flux.component';

@NgModule({
  declarations: [
    FluxComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    FluxComponent
  ]
})
export class FluxModule { }
