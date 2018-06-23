import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { FluxModule } from './../flux/flux.module';

import { AuthenticationService } from './authentication.service';

import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,
    FluxModule
  ],
  providers: [
    AuthenticationService
  ]
})
export class AuthenticationModule { }
