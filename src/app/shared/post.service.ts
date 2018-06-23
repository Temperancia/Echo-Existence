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
  constructor(private http: HttpClient) {

  }
  getPostTypeStyle (type: string): string {
    if (type === 'friends') {
      return 'post-friend';
    } else if (type === 'trending') {
      return 'post-tendance';
    }
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
  updateFeed(displayedFluxes: any) {
    let fluxes = '';
    for (const [flux, displayed] of Object.entries(displayedFluxes)) {
      if (displayed) {
        fluxes += flux + '+';
      }
    }
    if (fluxes !== '') {
      this.feed.next(fluxes.substring(0, fluxes.length - 1));
    }
  }
  getFeed(): Observable<Post[]> {
    return this.feed.pipe(
      debounceTime(300),
      flatMap((fluxes: string) => this.getPostsFromFlux(fluxes)),
    );
  }
  private convertDates(posts: Post[]): Post[] {
    for (let post of posts) {
      const createdOn = new Date(post.createdOn);
      post.createdOn = createdOn.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      }) + ' ' + createdOn.toLocaleTimeString('en-US');
    }
    return posts;
  }
  private sortByRep(posts: Post[]): Post[] {
    return posts.sort((a, b) => {
      return a.reputation.upvotes > b.reputation.upvotes ? -1 : 1;
    });
  }
  private getPosts(url: string): Observable<Post[]> {
    return this.http.get<Post[]>(API_ENDPOINT + url)
    .pipe(
      map(posts => {
        posts = this.convertDates(posts);
        posts = this.sortByRep(posts);
        return posts;
      })
    );
  }
  public getPostsFromFlux(fluxes: string): Observable<Post[]> {
    return this.getPosts('posting/posts/get?type=Flux&origin=' + fluxes);
  }
  public getPostsFromUser(id=getId()): Observable<Post[]> {
    return this.getPosts('posting/posts/get?user=' + id);
  }
  public getPostsFromTrust(key: string): Observable<Post[]> {
    return this.getPosts('posting/posts/get?type=Trust&origin=' + key);
  }
}
