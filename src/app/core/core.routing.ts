import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './../authentication/login/login.component';
import { FluxComponent } from './../flux/flux.component';
import { MyProfileComponent } from './../user/my-profile/my-profile.component';
import { TrustsComponent } from './../trusts/trusts.component';
import { TrustComponent } from './../trusts/trust/trust.component';

import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'flux', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'flux', component: FluxComponent, canActivate: [AuthGuard] },
  { path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard] },
  { path: 'trusts', component: TrustsComponent, canActivate: [AuthGuard, PublicGuard] },
  { path: 'trust/:name', component: TrustComponent, canActivate: [AuthGuard, PublicGuard] },
  // otherwise redirect to flux
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
