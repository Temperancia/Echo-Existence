import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgDatepickerModule } from 'ng2-datepicker';

import { PostService } from './post.service';

import { BlankComponent } from './blank/blank.component';
import { HeaderComponent } from './header/header.component';
import { FluxBoxComponent } from './header/flux-box/flux-box.component';
import { NavigationBoxComponent } from './header/navigation-box/navigation-box.component';
import { PostBoxComponent } from './header/post-box/post-box.component';
import { SearchBoxComponent } from './header/search-box/search-box.component';
import { EmojisComponent } from './emojis/emojis.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    BlankComponent,
    HeaderComponent,
    FluxBoxComponent,
    NavigationBoxComponent,
    PostBoxComponent,
    SearchBoxComponent,
    EmojisComponent,
    FooterComponent
  ],
  exports: [
    HttpClientModule,
    RouterModule,
    BrowserModule,
    FormsModule,
  //  NgxPageScrollModule,
    BrowserAnimationsModule,
    BlankComponent,
    HeaderComponent,
    FooterComponent,
    EmojisComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
  //  NgxPageScrollModule,
    NgDatepickerModule,
    BrowserAnimationsModule
  ],
  providers: [
    PostService
  ]
})
export class SharedModule { }
