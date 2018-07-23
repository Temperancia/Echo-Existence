import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss']
})
export class SignupComponent implements OnInit {
  newPublicUser: any = {};
  newEminentUser: any = {};
  feel: boolean;
  spotlight: boolean;
  know: boolean;
  motto: boolean;
  public: boolean;
  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.public = true;
  
  }
  public subscribe(pub) {
    let newUser;
    if (pub) {
      newUser = this.newPublicUser;
      newUser.type = 'Public';
    } else {
      newUser = this.newEminentUser;
      newUser.type = 'Eminent';
    }
    this.authenticationService.subscribe(newUser)
    .subscribe(response => {
      const user = {
        'id': response.id,
        'token': response.token
      };
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/']);
    }, err => {
      // server should not fail to create a user ?
    });
  }
}
