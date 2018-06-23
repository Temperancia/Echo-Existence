import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';

import { FluxComponent } from './flux.component';
import { FeedComponent } from './feed/feed.component';

@NgModule({
  declarations: [
    FluxComponent,
    FeedComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    FluxComponent
  ]
})
export class FluxModule { }
