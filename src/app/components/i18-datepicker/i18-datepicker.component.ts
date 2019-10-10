import {Component, EventEmitter, Injectable, Output} from '@angular/core';
import {NgbDatepickerI18n} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "ng2-translate";

const I18N_VALUES = {
  'ger': {
    weekdays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    months: ['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Juni', 'Juli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dez'],
  },
  'en': {
    weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  }
};

const now = new Date();

@Component({
  selector: 'app-i18-datepicker',
  templateUrl: './i18-datepicker.component.html',
  styleUrls: ['./i18-datepicker.component.scss']
})
@Injectable()
export class I18DatepickerComponent extends NgbDatepickerI18n {
  @Output() date: any = new EventEmitter();
  model;

  constructor(private translate: TranslateService) {
    super();
    if (!this.model) {
      this.selectToday();
      this.changeDate();
    }
  }

  changeDate() {
    this.date.emit(this.model);
  }

  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this.translate.currentLang].weekdays[weekday - 1];
  }

  getMonthShortName(month: number): string {
    return I18N_VALUES[this.translate.currentLang].months[month - 1];
  }

  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

}
