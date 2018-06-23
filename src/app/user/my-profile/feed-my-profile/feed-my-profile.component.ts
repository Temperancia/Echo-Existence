import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from './../../../shared/post.service';
import { Post } from './../../../core/models/post';

@Component({
  selector: 'app-feed-my-profile',
  templateUrl: 'feed-my-profile.component.html'
})
export class FeedMyProfileComponent  {
  posts: Post[];
  constructor(protected postService: PostService) {
  }
  ngOnInit() {
    this.getPosts();
  }
  getPosts() {
    this.postService.getPostsFromUser()
    .subscribe(posts => this.posts = posts);
  }
}
