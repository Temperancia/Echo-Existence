import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './../core/models/user';
import { API_ENDPOINT } from './../core/core.settings';

@Injectable()
export class FriendService {
  constructor(private http: HttpClient) {
  }
  addFriend(id: string): Observable<any> {
    const url = API_ENDPOINT + 'friends/user/request/' + id;
    return this.http.get<any>(url);
  }
  cancelFriend(id: string): Observable<any> {
    const url = API_ENDPOINT + 'friends/user/cancel/' + id;
    return this.http.get<any>(url);
  }
  acceptFriend(id: string): Observable<any> {
    const url = API_ENDPOINT + 'friends/user/accept/' + id;
    return this.http.get<any>(url);
  }
  declineFriend(id: string): Observable<any> {
    const url = API_ENDPOINT + 'friends/user/refuse/' + id;
    return this.http.get<any>(url);
  }
}
