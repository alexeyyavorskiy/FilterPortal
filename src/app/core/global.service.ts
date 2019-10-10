import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { DataObject } from "../classes/data-object";
import {
  FormControl,
  Validators
} from "@angular/forms";

@Injectable()
export class GlobalService {

  public monthNameList = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  public _status: Subject<number> = new Subject();
  private _statusValue: number;

  get status(): number {
    return this._statusValue;
  }

  public setStatus(value: number) {
    this._status.next(value);
    this._statusValue = value;
  }

  public generateFormGroup(objects: DataObject[], group: any) { // method generate dynamic form, works without return!
    objects.forEach(object => {
      if (object.writable) {
        if (object.min_value !== null && object.max_value !== null) {
          if (object.data_type === 'Number') {
            group[object.id] = new FormControl(null, Validators.compose([Validators.pattern(/^([0-9]*[,])?[0-9]+$/),
              Validators.required, Validators.min(object.min_value), Validators.max(object.max_value)]));
          } else if (object.data_type === 'String') {
            group[object.id] = new FormControl(null);
          } else {
            group[object.id] = new FormControl(null);
          }
        } else {
          group[object.id] = new FormControl(null);
        }
      }
    });
  }

  public getFilterColor(val) {
    if (val === 100) {
      return '#db2244';
    } else if (val >= 80 && val < 100) {
      return '#efb800';
    } else {
      return '#12d54e';
    }
  }

  public addToList(dataMap, list, id, fakeType?) {
    const val = dataMap.get(id);
    if (val) {
      list.push(val);
    } else {
      list.push(new DataObject(id, null, null, null, null, fakeType || "", "", !!fakeType)); // added for display empty parameter
    }
  }

  public getYearFromTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.getFullYear();
  }

  public getMonthFromTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    return this.monthNameList[date.getMonth()];
  }

  public getDayHourMinFromTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    return `${this.minTwoDigits(date.getDate())} ${this.minTwoDigits(date.getHours())}:${this.minTwoDigits(date.getMinutes())}`;
  }

  public getWeekStart() {
    const date = new Date();
    const day = date.getDay(),
      diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    date.setDate(diff);
    date.setHours(0, 0, 0, 0);
    // console.log(`${new Date(date)}, ${date.getTime() / 1000}`);
    return date.getTime() / 1000;
  }

  public getCurrentDayStart() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date.getTime() / 1000;
  }

  public getMonthStart() {
    const date = new Date();
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    return startDate.getTime() / 1000;
  }

  public getThreeMonth() {
    const date = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 3);
    return startDate.getTime() / 1000;
  }

  public minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
  }
}
