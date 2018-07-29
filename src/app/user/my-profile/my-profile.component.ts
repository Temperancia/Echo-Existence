import { Component, OnInit } from '@angular/core';
import {User} from '@app/core/models/user';
import {UserService} from './../user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: 'my-profile.component.html',
  styleUrls: ['my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  public friends: User[];
  public user: User;
  public toggles = {
    me: true,
    friends: false,
    posts: false,
    history: false
  };
  public fluxHistory = true;
  public trustHistory = false;
  constructor(private userService: UserService) { }
  ngOnInit() {
    this.getFriends();
    this.getProfile();
  }
  toggle(element: string): void {
    const state = this.toggles[element];
    for (const toggle in this.toggles) {
      this.toggles[toggle] = false;
    }
    this.toggles[element] = !state;
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
