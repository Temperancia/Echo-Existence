import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { DatepickerOptions } from 'ng2-datepicker';
import { PostService } from '../../post.service';
import { Flux } from '@app/core/enums/flux.enum';
import { PostType } from '@app/core/enums/post-type.enum';
import { yesterday, now } from '@app/core/core.settings';

@Component({
  selector: 'app-flux-box',
  templateUrl: 'flux-box.component.html',
  styleUrls: ['flux-box.component.scss']
})
export class FluxBoxComponent implements OnInit {
  startDate: Date;
  endDate: Date;
  tags: string;
  tagList: number[] = [0];
  currentTag: string = '';
  tagPosition: number = 0;
  foundTags$: Observable<string>;
  startCalendarOptions: DatepickerOptions = {
    displayFormat: 'MMM D[,] YYYY',
    useEmptyBarTitle: false,
    barTitleFormat: 'MMMM YYYY',
    placeholder: 'Start Date',
    minYear: 2018,
    maxYear: 2030,
    maxDate: yesterday,
    addClass: 'w-100'
  };
  endCalendarOptions: DatepickerOptions = {
    displayFormat: 'MMM D[,] YYYY',
    useEmptyBarTitle: false,
    barTitleFormat: 'MMMM YYYY',
    placeholder: 'End Date',
    minYear: 2018,
    maxYear: 2030,
    maxDate: now,
    addClass: 'w-100'
  };
  tendance = Flux.Tendance;
  friends = Flux.Friends;
  dailyLife = Flux.DailyLife;
  lifeStyle = Flux.LifeStyle;
  echo = PostType.Echo;
  rumour = PostType.Rumour;
  inquiry = PostType.Inquiry;
  outrage = PostType.Outrage;
  fluxPreference: any;
  show: any = {
    tags: false
  };

  @Output() hide = new EventEmitter<void>();

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.fluxPreference = JSON.parse(localStorage.getItem('fluxPreference'));
  }
  public toggleFlux(flux: Flux): void {
    this.fluxPreference.flux[flux] = !this.fluxPreference.flux[flux];
  }
  public toggleType(type: PostType): void {
    this.fluxPreference.type[type] = !this.fluxPreference.type[type];
  }
  public switchSort(sort): void {
    this.fluxPreference.sort = this.fluxPreference.sort === sort ? '' : sort;
  }
  public onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      if (this.currentTag !== '') {
        this.currentTag = '';
        this.tagPosition = this.tags.length;
        this.tagList.push(this.tagPosition);
        this.tags += '\t';
      }
    } else if (event.key === 'Backspace') {
      if (this.tagList.length > 1 && this.tagPosition === this.tags.length) {
        this.tags = this.tags.slice(0, this.tagList[this.tagList.length - 2]);
        this.tagPosition = this.tags.length - 1;
        this.tagList.pop();
      }
    }
  }
  public onKeyPress(event: KeyboardEvent): void {
    if (this.currentTag === '') {
      const inputChar = String.fromCharCode(event.charCode);
      if (inputChar !== '@' && inputChar !== '#' && inputChar !== '\b') {
        event.preventDefault();
      } else {
        this.currentTag = inputChar === '@' ? 'Author' : 'Content';
      }
    }
  }
  public search(event: Event): void {
    if (this.currentTag === '') {
      const inputChar = String.fromCharCode(this.tags[0]);
      if (inputChar !== '@' && inputChar !== '#' && inputChar !== '\b') {
        event.preventDefault();
      } else {
        this.currentTag = inputChar === '@' ? 'Author' : 'Content';
      }
    }
    console.log(event)
    const tag = this.tags.slice(0, this.tagList[this.tagList.length - 1]);
    console.log(tag)
  }
  public updateFeed(): void {
    if (this.startDate) {
      this.fluxPreference.period.start = this.startDate;
    }
    if (this.endDate) {
      this.fluxPreference.period.end = this.endDate;
    }
    localStorage.setItem('fluxPreference', JSON.stringify(this.fluxPreference));
    this.postService.updateFeed(this.fluxPreference);
    this.hide.emit();
  }
}
