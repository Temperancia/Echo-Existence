import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';

import { FriendService } from './friend.service';

import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [
    NotificationsComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    FriendService
  ]
})
export class RequestsModule { }
