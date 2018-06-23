import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../../authentication/authentication.service';
@Component({
  selector: 'app-navigation-box',
  templateUrl: 'navigation-box.component.html',
  styleUrls: ['navigation-box.component.scss']
})
export class NavigationBoxComponent implements OnInit {
  @Output()
    toggle = new EventEmitter<string>();
  constructor(private authenticationService: AuthenticationService,
  public router: Router) { }

  ngOnInit() {
  }
  showEcho(): void {
    this.toggle.emit('echo');
  }
  navigate(url): void {
    this.toggle.emit('none');
    this.router.navigateByUrl(url);
  }
  public logout(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl('/login');
  }
}
