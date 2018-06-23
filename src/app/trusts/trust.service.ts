import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Trust } from './../core/models/trust';
import { User } from './../core/models/user';
import { handleError, API_ENDPOINT } from './../core/core.settings';

export enum TrustRole {
  Inspiration,
  Trustee,
  Follower,
  None
}

@Injectable()
export class TrustService {
  constructor(private http: HttpClient) {
  }
  createTrust(trust: any): Observable<any> {
    return this.http.post(API_ENDPOINT + 'trusting/trusts/create', {
      trust: trust
    });
  }
  joinTrust(trustId: string): Observable<any> {
    return this.http.get(API_ENDPOINT + 'trusting/trust/' + trustId + '/requesting/send');
  }
  cancelRequest(trustId: string) {
    return this.http.get<any>(API_ENDPOINT + 'trusting/trust/' + trustId + '/requesting/cancel')
    .pipe(
      catchError(handleError('cancelRequest', []))
    );
  }
  acceptRequest(trustId: string, userId: string) {
    return this.http.get<any>(API_ENDPOINT + 'trusting/trust/' + trustId + '/requesting/accept/' + userId)
    .pipe(
      catchError(handleError('acceptRequest', []))
    );
  }
  declineRequest(trustId: string, userId: string) {
    return this.http.get<any>(API_ENDPOINT + 'trusting/trust/' + trustId + '/requesting/decline/' + userId)
    .pipe(
      catchError(handleError('declineRequest', []))
    );
  }
  getTrusts(): Observable<any> {
    return this.http.get<any>(API_ENDPOINT + 'trusting/trusts/get')
    .pipe(
      catchError(handleError('getTrusts', []))
    );
  }
  getTrust(trustKey: string): Observable<any> {
    return this.http.get<any>(API_ENDPOINT + 'trusting/trust/' + trustKey + '/get');
  }
  createPolicy(trustKey: string, newPolicy: string) {

  }
  /*
  getMembers(trust): Observable<User[]> {
    let members = [
      {
        name: "Vanessa Prikles",
        reputation: 34
      },
      {
        name: "James Laper",
        reputation: 6
      },
      {
        name: "Oliver Thomson",
        reputation: 22
      }
    ];
    return of(members);
  }
  */
}
