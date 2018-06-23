import { Component, OnInit } from '@angular/core';
import {User} from './../../core/models/user';
import {UserService} from './../user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: 'my-profile.component.html',
  styles: []
})
export class MyProfileComponent implements OnInit {
  public friends: User[];
  public user: User;
  constructor(private userService: UserService) { }
  ngOnInit() {
    this.getFriends();
    this.getProfile();
  }
  public getFriends(): void {
    this.userService.getFriends()
    .subscribe(friends => {
      this.friends = friends;
    });
  }
  public getProfile(): void {
    this.userService.getUser()
    .subscribe(user => {
      this.user = user;
    });
  }
  public getReputation(friend: User): string {
    return friend.reputation >= 0 ? 'green' : 'red';
  }
  public getFeedClass(): string {
    return 'col-12';
  }
}
