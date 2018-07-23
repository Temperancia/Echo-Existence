import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { FluxModule } from './../flux/flux.module';

import { AuthenticationService } from './authentication.service';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
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
