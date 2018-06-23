import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';

import { User } from './../core/models/user';
import { Trust } from './../core/models/trust';
import { getId, handleError, API_ENDPOINT } from './../core/core.settings';

export enum UserType {
  Moderator = 'Moderator',
  Public = 'Public',
  Eminent = 'Eminent',
  Anonymous = 'Anonymous'
}

@Injectable()
export class UserService {
  friends: User[];
  constructor(private http: HttpClient) {
  }
  getFriends(id=getId()): Observable<any> {
    const url = API_ENDPOINT + 'user/' + id + '/friends';
    return this.http.get<any>(url)
    .pipe(
      catchError(handleError('getFriends', []))
    );
  }
  getRequests(): Observable<any> {
    const url = API_ENDPOINT + 'user/requests';
    return this.http.get<any>(url)
    .pipe(
      catchError(handleError('getRequests', []))
    );
  }
  getTrusts(id=getId()): Observable<any> {
    const url = API_ENDPOINT + 'user/' + id + '/trusts';
    return this.http.get<any>(url)
    .pipe(
      catchError(handleError('getTrusts', []))
    );
  }
  getUsers(name = undefined): Observable<User[]> {
    let url = API_ENDPOINT + 'user/users';
    if (name) {
      url += '?name=' + name;
    }
    return this.http.get<User[]>(url);
  }
  getFriendableUsers(name: string = undefined): Observable<any> {
    const url = API_ENDPOINT + 'user/friendable-users';
    return this.http.get<any>(url)
    .pipe(
      tap(users => { console.log(users) }),
      catchError(handleError('getFriendableUsers', []))
    );
  }
  getUser(id=getId()): Observable<any> {
    const url = API_ENDPOINT + 'user/' + id + '/profile';
    return this.http.get<any>(url)
    .pipe(
      catchError(handleError('getUser', []))
    );
  }
}
