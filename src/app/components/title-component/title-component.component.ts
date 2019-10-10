import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../share/auth.service";
import {GlobalService} from "../../core/global.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-title-component',
  templateUrl: './title-component.component.html',
  styleUrls: ['./title-component.component.scss']
})
export class TitleComponentComponent implements OnInit, OnDestroy {

  public titleClass: string;
  private subscription: Subscription;
  private status: number;

  constructor(public authService: AuthService, private globalService: GlobalService) {
  }

  ngOnInit() {
    this.subscription = this.globalService._status.subscribe((data) => {
      this.status = data;
      this.titleClass = this.getTitleClass(this.status);
    })
  }

  private getTitleClass(val) {
    if (val) {
      if (val === 0 || val === 1) {
        return '';
      }
      if (val === 2) {
        return 'title-component--yellow';
      }
      if (val === 3 || val === 4) {
        return 'title-component--red';
      }
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
