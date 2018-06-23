import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../user/user.service';
import { FriendService } from './../../requests/friend.service';
import { TrustService } from './../../trusts/trust.service';
import { displayedNotifications, refresh } from './../../core/core.settings';

export enum RequestType {
  FriendRequestSent = 'friendRequestSent',
  FriendRequestReceived = 'FriendRequestReceived',
  trustRequestSent = 'trustRequestSent',
  trustRequestReceived = 'trustRequestReceived',
  trustInvitationSent = 'FriendRequestReceived',
  trustInvitationReceived = 'FriendRequestReceived'
}

@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.component.html',
  styleUrls: ['notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  requests: any;
  requestType = RequestType;
  displayedNotifications = displayedNotifications;
  constructor(private router: Router,
    private friendService: FriendService,
    private trustService: TrustService,
    private userService: UserService) {
  }
  ngOnInit() {
    this.getRequests();
  }
  private getRequests() {
    this.userService.getRequests()
    .subscribe(requests => {
      this.requests = requests;
    });
  }
  getRequestsClass(): string {
    if (!this.requests) {
      return '';
    }
    return 'offset-3 col-6';
  }
  toggle(type: string) {
    displayedNotifications[type] = !displayedNotifications[type];
  }
  cancelFriendRequest(request) {
    this.friendService.cancelFriend(request._id).subscribe(_ => {
      refresh(this.router);
    });
  }
  acceptFriendRequest(request) {
    this.friendService.acceptFriend(request._id).subscribe(_ => {
      refresh(this.router);
    });
  }
  declineFriendRequest(request) {
    this.friendService.declineFriend(request._id).subscribe(_ => {
      refresh(this.router);
    });
  }
  cancelTrustRequest(request) {
    this.trustService.cancelRequest(request._id).subscribe(_ => {
      refresh(this.router);
    });
  }
  acceptTrustRequest(request) {
    this.trustService.acceptRequest(request.trust._id, request.user._id).subscribe(r => {
      refresh(this.router);
      console.log(r);
    });
  }
  declineTrustRequest(request) {
    this.trustService.declineRequest(request.trust._id, request.user._id).subscribe(_ => {
      refresh(this.router);
    });
  }
}
