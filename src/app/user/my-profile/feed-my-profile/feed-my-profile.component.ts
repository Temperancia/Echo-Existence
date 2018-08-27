import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '@app/shared/post.service';
import { Post } from '@app/core/models/post';

@Component({
  selector: 'app-feed-my-profile',
  templateUrl: 'feed-my-profile.component.html',
  styleUrls: ['feed-my-profile.component.scss']
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
