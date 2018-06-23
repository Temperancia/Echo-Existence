import { Component, OnInit } from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';
import { PostService } from './../../post.service';
import { Flux } from './../../../core/enums/flux.enum';
import { displayedFluxes } from './../../../core/core.settings';

@Component({
  selector: 'app-flux-box',
  templateUrl: 'flux-box.component.html',
  styleUrls: ['flux-box.component.scss']
})
export class FluxBoxComponent implements OnInit {
  date: Date;
  now: Date = new Date(Date.now());
  calendarOptions: DatepickerOptions = {
    minYear: 2018,
    maxYear: this.now.getFullYear(),
    maxDate: this.now,
    placeholder: 'Click to select a date',
    useEmptyBarTitle: true
  };
  tendance = Flux.Tendance;
  friends = Flux.Friends;
  dailyLife = Flux.DailyLife;
  lifeStyle = Flux.LifeStyle;
  displayedFluxes = displayedFluxes;
  constructor(private postService: PostService) { }

  ngOnInit() {
  }
  public toggleFlux(flux: Flux): void {
    displayedFluxes[flux] = !displayedFluxes[flux];
    this.postService.updateFeed(displayedFluxes);
  }
}
