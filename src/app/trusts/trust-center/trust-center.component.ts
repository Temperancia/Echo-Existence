import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrustService } from './../trust.service';
import { Trust } from './../../core/models/trust';
import { refresh } from './../../core/core.settings';

@Component({
  selector: 'app-trust-center',
  templateUrl: 'trust-center.component.html',
  styleUrls: ['trust-center.component.scss']
})
export class TrustCenterComponent implements OnInit {
  newTrust: any = {};
  trusts: Trust[];
  constructor(private trustService: TrustService, private router: Router) {
  }
  ngOnInit() {
    this.getTrusts();
  }
  getTrusts() {
    this.trustService.getTrusts()
    .subscribe(trusts => {
      this.trusts = trusts;
    }, err => {
      console.log(err);
    });
  }
  createTrust() {
    this.trustService.createTrust(this.newTrust).subscribe(_ => {
      refresh(this.router);
    });
  }
  joinTrust(id: string, key: string) {
    this.trustService.joinTrust(id).subscribe(_ => {
      refresh(this.router);
    });
  }
  enterTrust(name: string) {
    const url = '/trust/' + encodeURIComponent(name);
    this.router.navigate([url]);
  }
}
