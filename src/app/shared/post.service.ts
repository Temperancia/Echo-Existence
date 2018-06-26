import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap, map, flatMap, tap
 ,  catchError } from 'rxjs/operators';

import { Post } from './../core/models/post';
import { getId, handleError, API_ENDPOINT } from './../core/core.settings';
import { Flux } from './../core/enums/flux.enum';

@Injectable()
export class PostService {
  feed = new BehaviorSubject<string>(null);
  constructor(private http: HttpClient) { }
  getPostTypeStyle (type: string): string {
    return type.toLowerCase() + '-bg';
  }
  create(post: Post) {
    return this.http.post(API_ENDPOINT + 'posting/posts/create', {
      post: post
    })
    .pipe(
      catchError(handleError('create', []))
    );
  }
  upvote(postId: string): Observable<any> {
    return this.http.get(API_ENDPOINT + 'posting/post/' + postId + '/upvote');
  }
  downvote(postId: string): Observable<any> {
    return this.http.get(API_ENDPOINT + 'posting/post/' + postId + '/downvote');
  }
  updateFeed(fluxPreference: any) {
    const request = 'origin=' + Object.keys(fluxPreference.flux).filter(flux => {
      return fluxPreference.flux[flux];
    }).join('+')
    + '&postType=' + Object.keys(fluxPreference.type).filter(type => {
      return fluxPreference.type[type];
    }).join('+')
    + '&sort=' + fluxPreference.sort
    + '&startDate=' + fluxPreference.period.start
    + '&endDate=' + fluxPreference.period.end;
    this.feed.next(request);
  }
  getFeed(): Observable<Post[]> {
    this.updateFeed(JSON.parse(localStorage.getItem('fluxPreference')));
    return this.feed.pipe(
      flatMap((request: string) => this.getPostsFromFlux(request)),
      tap(posts => console.log(posts))
    );
  }
  private convertDates(posts: Post[]): Post[] {
    for (let post of posts) {
      const createdOn = new Date(post.createdOn);
      post.createdOn = createdOn.toLocaleDateString('en-US', {
        year: '2-digit', month: '2-digit', day: '2-digit'
      }) + ' ' + createdOn.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit'
      });
    }
    return posts;
  }
  private getPosts(url: string): Observable<Post[]> {
    return this.http.get<Post[]>(API_ENDPOINT + url)
    .pipe(
      map(posts => {
        posts = this.convertDates(posts);
        return posts;
      })
    );
  }
  public getPostsFromFlux(request: string): Observable<Post[]> {
    return this.getPosts('posting/posts/get?type=Flux&' + request);
  }
  public getPostsFromUser(id=getId()): Observable<Post[]> {
    return this.getPosts('posting/posts/get?user=' + id);
  }
  public getPostsFromTrust(key: string): Observable<Post[]> {
    return this.getPosts('posting/posts/get?type=Trust&origin=' + key);
  }
}
