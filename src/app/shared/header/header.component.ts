import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, transition, animate, group } from '@angular/animations';
import { PostService } from './../post.service';
import { AuthenticationService } from './../../authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition(':leave', [
        group([
          animate('0.2s ease', style({
            transform: 'translate(150px,25px)'
          })),
          animate('0.5s 0.2s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  public isLoggedIn: boolean;
  public isAnonymous: boolean;
  public searchInput: string;
  public toggles = {
    navigation: false,
    echo: false,
    menu: false,
    none: true
  };
  @ViewChild('search') search;
  constructor(private postService: PostService,
               private authenticationService: AuthenticationService,
               private router: Router
              ) {
  }

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.isLoggedIn();
    this.isAnonymous = this.authenticationService.isAnonymous();
  }

  navigate(url: string): void {
    this.toggle('none');
    this.router.navigateByUrl(url);
  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl('/login');
  }

  toggle(element: string): void {
    const state = this.toggles[element];
    for (const toggle in this.toggles) {
      this.toggles[toggle] = false;
    }
    this.toggles[element] = !state;
  }
}
