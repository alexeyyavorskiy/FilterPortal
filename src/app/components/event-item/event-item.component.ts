import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { EventObject } from "../../classes/event-object";
import { GlobalService } from "../../core/global.service";

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent implements OnInit {
  @Input() event: EventObject;
  @Input() warnType: string;
  public typeClass: string;

  constructor(public globalService: GlobalService) {
    // this.globalService.getWeekStart(new Date());
  }

  ngOnInit() {
    // console.log(this.warnType);
    if (this.warnType === 'warning') {
      this.typeClass = 'group-parameter__warning--yellow fa fa-exclamation-triangle';
    } else if (this.warnType === 'error') {
      this.typeClass = 'group-parameter__warning--red fa fa-exclamation-triangle';
    } else {
      this.typeClass = '';
    }
  }

}
