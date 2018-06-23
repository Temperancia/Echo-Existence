import {Component, OnInit} from '@angular/core';
import {Trust} from './../core/models/trust';
import {User} from './../core/models/user';
import {UserService} from './../user/user.service';
import {FriendService} from './../requests/friend.service';

@Component({
  selector: 'trusts-component',
  templateUrl: 'trusts.component.html'
})
export class TrustsComponent implements OnInit {
  showTrusts: boolean = false;
  showFriends: boolean = true;
  ownedTrusts: Trust[];
  joinedTrusts: Trust[];

  friends: User[];
  constructor(private userService: UserService, private friendService: FriendService) {

  }
  ngOnInit() {
    this.getTrusts();
    this.getFriends();
  }
  private getTrusts() {
    this.userService.getTrusts()
    .subscribe(response => {
      console.log(response);
      this.ownedTrusts = response.trustsOwned;
      this.joinedTrusts = response.trustsJoined;
    }, err => {
      console.log(err);
    });
  }

  private getFriends() {
    this.userService.getFriends()
    .subscribe(friends => {
      this.friends = friends;
      console.log(friends);
    }, err => {
      console.log(err);
    });
  }

  acceptFriend(id: string): void {
    this.friendService.acceptFriend(id)
    .subscribe(response => {
      location.reload();
    });
  }
}
