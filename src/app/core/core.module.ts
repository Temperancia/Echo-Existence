import {NgModule} from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { routing } from './core.routing';

import { SharedModule } from './../shared/shared.module';
import { AuthenticationModule } from './../authentication/authentication.module';
import { UserModule } from './../user/user.module';
import { RequestsModule } from './../requests/requests.module';
import { TrustModule } from './../trusts/trusts.module';

import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';
import { JwtInterceptor } from './jwt.interceptor';

import { CoreComponent } from './core.component';

@NgModule({
  declarations: [
    CoreComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'echo'}),
    routing,
    TransferHttpCacheModule,
    SharedModule,
    AuthenticationModule,
    UserModule,
    RequestsModule,
    TrustModule
  ],
  providers: [
    AuthGuard,
    PublicGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],
  bootstrap: [CoreComponent]
})
export class CoreModule { }
