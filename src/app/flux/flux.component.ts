import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PostService } from '@app/shared/post.service';
import { Flux } from '@app/core/enums/flux.enum';
import { PostType } from '@app/core/enums/post-type.enum';
import { Post } from '@app/core/models/post';
import { getId, refresh } from '@app/core/core.settings';
import { postReplies } from '@env/environment';

@Component({
  selector: 'flux-component',
  templateUrl: 'flux.component.html',
  styleUrls: ['flux.component.scss']
})
export class FluxComponent implements OnInit {
  postReplies = postReplies;
  flux = Flux;
  id: string = getId();
  feed$: Observable<Post[]>;
  toggle = {
    postHeader: [],
    postVote: []
  };
  postVerbs: any = {
    [PostType.Echo]: 'saying.',
    [PostType.Rumour]: 'considering~',
    [PostType.Inquiry]: 'asking?',
    [PostType.Outrage]: 'outraged!'
  };
  constructor(private router: Router, private postService: PostService) { }
  ngOnInit() {
    this.launchFeed();
  }
  launchFeed() {
    this.feed$ = this.postService.getFeed();
  }
  togglePostElement(element: string, postId: string): void {
    const index = this.toggle[element].indexOf(postId);
    if (index === -1) {
      this.toggle[element].push(postId);
    } else {
      this.toggle[element].splice(index, 1);
    }
  }
  showPostElement(element: string, postId: string): boolean {
    return this.toggle[element].find(member => member === postId);
  }
  upvote(postId: string, type: string) {
    this.togglePostElement('postVote', postId);
    this.postService.upvote(postId, type);
  }
  downvote(postId: string, type: string) {
    this.togglePostElement('postVote', postId);
    this.postService.downvote(postId, type);
  }
  cancelVote(postId: string) {
    this.togglePostElement('postVote', postId);
    this.postService.cancel(postId);
  }
}
