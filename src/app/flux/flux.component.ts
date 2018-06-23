import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { PostService } from './../shared/post.service';
import { Flux } from './../core/enums/flux.enum';
import { Post } from './../core/models/post';
import { getId, refresh } from './../core/core.settings';

@Component({
  selector: 'flux-component',
  templateUrl: 'flux.component.html'
})
export class FluxComponent implements OnInit {
  flux = Flux;
  feed$: Observable<Post[]>;
  constructor(private router: Router, private postService: PostService) {
  }
  ngOnInit() {
    this.launchFeed();
  }
  launchFeed() {
    this.feed$ = this.postService.getFeed();
  }
  canVote(authorId: string, voters: any[]): boolean {
    const id = getId();
    return id !== authorId && !(voters.find(voter => { return voter === id; }));
  }
  upvote(postId) {
    this.postService.upvote(postId).subscribe(_ => {
      refresh(this.router);
    });
  }
  downvote(postId) {
    this.postService.downvote(postId).subscribe(_ => {
      refresh(this.router);
    });
  }
}
