import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';

import { UserService } from './user.service';

import { MyProfileComponent } from './my-profile/my-profile.component';
import { FeedMyProfileComponent } from './my-profile/feed-my-profile/feed-my-profile.component';

@NgModule({
  declarations: [
    MyProfileComponent,
    FeedMyProfileComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
