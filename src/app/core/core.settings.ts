import { Observable ,  of } from 'rxjs';
import { Router } from '@angular/router';

export const API_ENDPOINT='http://echo-life.com:8080/api/';
export const now: Date = new Date(Date.now());
export let yesterday: Date = new Date();
yesterday.setDate(yesterday.getDate() - 1);
export const displayedNotifications: any = {
  'friendRequestsSent': false,
  'friendRequestsReceived': false,
  'trustRequestsSent': false,
  'trustRequestsReceived': false,
  'trustInvitationsSent': false,
  'trustInvitationsReceived': false
};
export function getToken(): string {
  return JSON.parse(localStorage.getItem('currentUser')).token;
}
export function getId(): string {
  return JSON.parse(localStorage.getItem('currentUser')).id;
}
export function handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.log(error);
    return Observable.throw(error.message);
  };
}
export function refresh(router: Router) {
  const previousUrl = router.url;
  router.navigateByUrl('blank', { skipLocationChange: true }).then(_ => {
    router.navigateByUrl(previousUrl);
  });
}
