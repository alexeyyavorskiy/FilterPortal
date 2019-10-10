import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { DataService } from "../../share/data.service";
import { EventObject } from "../../classes/event-object";
import { GlobalService } from "../../core/global.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-event-history',
  templateUrl: './event-history.component.html',
  styleUrls: ['./event-history.component.scss']
})
export class EventHistoryComponent implements OnInit, OnDestroy {

  public todayEvents: EventObject[];
  public weekEvents: EventObject[];
  public monthEvents: EventObject[];
  public olderEvents: EventObject[];
  private listOfEventLists: EventObject[][];

  public currentEventType: string;
  public eventTypes: string[];
  private defaultType = 'Select type';
  public collapsed = false;
  private periodList: string[];
  private TODAY = 'today';
  private THIS_WEEK = 'this week';
  private THIS_MONTH = 'this month';
  private OLDER = 'older';
  private subscription: Subscription;

  constructor(public globalService: GlobalService, private dataService: DataService) {
    this.currentEventType = this.defaultType;
    this.eventTypes = [
      'All events', // All events
      'b14f4b80-179f-4517-a939-de6013357cc3', // Maintenance events
      '1d0c28dd-24d9-4e98-b8c2-08a1b5e00f87', // Machine errors
      '189bbce6-8ae0-4442-9e5c-a3a4c7c9aaab' // Machine events
    ];
  }

  ngOnInit() {
    this.initEventLists();
    this.listOfEventLists.push(this.todayEvents);
    this.listOfEventLists.push(this.weekEvents);
    this.listOfEventLists.push(this.monthEvents);
    this.listOfEventLists.push(this.olderEvents);
    this.periodList = [];
    this.periodList.push(this.TODAY);
    this.periodList.push(this.THIS_WEEK);
    this.periodList.push(this.THIS_MONTH);
    this.periodList.push(this.OLDER);

    setTimeout(() => {
      this.selectType(this.eventTypes[0]);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initEventLists() {
    this.todayEvents = [];
    this.weekEvents = [];
    this.monthEvents = [];
    this.olderEvents = [];
    this.listOfEventLists = [];
  }

  downloadEvents() {
    this.dataService.downloadEvents();
    return false;
  }

  selectType(eventType: string) {
    if (eventType) {
      this.currentEventType = eventType;
      for (let i = 0; i < this.listOfEventLists.length; i++) {
        const period = this.periodList[i];
        this.getEvents(eventType, period, this.getFromValue(period), this.getToValue(period));
      }
    }
  }

  getEvents(eventType: string, period: string, from: number, to?: number) {
    if (!to) {
      to = new Date().getTime() / 1000;
    }
    if (!from) {
      from = 0;
    }
    if (eventType && eventType !== this.defaultType) {
      if (eventType === 'All events') {
        eventType = '';
      }
      this.subscription = this.dataService.queryEvents(from, to, 0, -1, "", eventType, "").subscribe((res) => {
        this.fillEventList(period, res);
      }, (err) => {
        console.log(err);
      })
    }
  }

  itemWasToggled(event, period) {
    if (!event) {
      // const from = this.getFromValue(period);
      // const to = this.getToValue(period);
      // this.getEvents(this.currentEventType, period, from, to);
      // } else {
      //   if (period === this.TODAY) {
      //     this.todayEvents = [];
      //   }
      //   if (period === this.THIS_WEEK) {
      //     this.weekEvents = [];
      //   }
      //   if (period === this.THIS_MONTH) {
      //     this.monthEvents = [];
      //   }
      //   if (period === this.OLDER) {
      //     this.olderEvents = [];
      //   } else {
      //     this.allEvents = [];
      //   }
    }
  }

  private getFromValue(period: string) {
    let from: number;
    if (period === this.TODAY) {
      from = this.globalService.getCurrentDayStart();
    }
    if (period === this.THIS_WEEK) {
      from = this.globalService.getWeekStart();
    }
    if (period === this.THIS_MONTH) {
      from = this.globalService.getMonthStart();
    }
    if (period === this.OLDER) {
      from = this.globalService.getThreeMonth();
    }
    return from;
  }

  private getToValue(period: string) {
    let to = new Date().getTime() / 1000;
    if (period === this.OLDER) {
      to = this.globalService.getMonthStart();
    }
    return to;
  }

  private fillEventList(period: string, data: any) {
    if (period === this.TODAY) {
      this.todayEvents = data;
    }
    if (period === this.THIS_WEEK) {
      this.weekEvents = data;
    }
    if (period === this.THIS_MONTH) {
      this.monthEvents = data;
    }
    if (period === this.OLDER) {
      this.olderEvents = data;
    }
  }
}
