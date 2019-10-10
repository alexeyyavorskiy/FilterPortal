import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../share/auth.service";
import {GlobalService} from "../../core/global.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public statusClass: string;
  public year: number;

  constructor(public authService: AuthService, private globalService: GlobalService) {
  }

  ngOnInit() {
    this.year = new Date().getFullYear();
    this.subscription = this.globalService._status.subscribe((status) => {
      this.statusClass = this.getStatusClass(status);
    })
  }

  getStatusClass(status) {
    if (status === 2) {
      return 'page-content--yellow';
    } else if (status === 3 || status === 4) {
      return 'page-content--red';
    } else {
      return '';
    }
  }

  scrollTop(element) {
    element.scrollIntoView();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
