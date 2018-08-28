import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, transition, animate, group } from '@angular/animations';
import { PostService } from '../../post.service';
import { Post } from '@app/core/models/post';
import { Flux } from '@app/core/enums/flux.enum';
import { PostType } from '@app/core/enums/post-type.enum';
import { refresh } from '@app/core/core.settings';

@Component({
  selector: 'app-post-box',
  templateUrl: 'post-box.component.html',
  styleUrls: ['post-box.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate(350)
      ]),
      transition(':leave', [
        group([
          animate('0.2s ease', style({
            transform: 'translate(150px,25px)'
          })),
          animate('0.5s 0.2s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class PostBoxComponent implements OnInit {
  public currentPost: Post;
  flux = Flux;
  currentFlux: Flux;
  postType = PostType;
  randomCatchyPool: string[] = [
    'It\'s now',
    'Just do it !',
    'Watcha say ?',
    'Time to roll',
    'Lovely day to enlighten the world',
    'Bam',
    'Guess what'
  ];
  randomCatchy: string = '';
  show: any = {
    postTypes: false
  };

  @Output() hide = new EventEmitter<void>();

  constructor(private router: Router, private postService: PostService) {
  }
  ngOnInit() {
    this.currentPost = new Post;
    this.randomCatchy = this.pickCatchy();
  }
  close(): void {
    this.hide.emit();
  }
  pickCatchy(): string {
    const random = Math.ceil(Math.random() * this.randomCatchyPool.length);
    return this.randomCatchyPool[random];
  }
  public onEmoji(emoji) {
    this.currentPost += emoji;
  }
  toggle(flux: Flux) {
    this.currentFlux = flux;
    this.currentPost.originType = 'Flux';
    this.currentPost.originName = flux;
  }
  public post(postType: PostType): void {
    this.currentPost.postType = postType;
    this.postService.create(this.currentPost)
    .subscribe(_ => {
      refresh(this.router);
    });
  }
}
