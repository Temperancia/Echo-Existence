import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {};
  userForm: FormGroup;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      'email': new FormControl(this.user.email, [
        Validators.required
      ])
    });
  }

  get email() { return this.userForm.get('email'); }
  public login(pub: boolean) {
    let credentials;
    if (pub) {
      credentials = {
        'email': this.user.email,
        'password': this.user.password
      };
    }
    this.authenticationService.login(credentials)
    .subscribe(response => {
      const user = {
        'id': response.id,
        'token': response.token
      };
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/']);
    }, err => {
      
    });
  }


}
