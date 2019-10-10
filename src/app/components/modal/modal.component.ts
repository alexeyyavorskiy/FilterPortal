import {Component} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DataService} from '../../share/data.service';

const now = new Date();

@Component({
  selector: 'app-ngbd-modal-content',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class NgbdModalContentComponent {
  data: any;
  id: any;
  newId: any;
  date: any;

  constructor(public activeModal: NgbActiveModal, private dataService: DataService) {
    this.data = dataService.modalData;
  }

  takeDate(event) {
    this.date = event;
  }

  public close() {
    this.activeModal.close();
  }

  public saveData() {
    // if (!this.date) {
    //   this.date = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    // }
    // const manufacturingDate = "" + new Date(`${this.date.year} ${this.date.month} ${this.date.day}`).getTime() / 1000;
    // this.dataService.setObjectValue(this.id, new Date(`${this.date.year} ${this.date.month} ${this.date.day}`).getTime());
    this.dataService.replaceAssembly(this.id, this.newId, this.newId, "").subscribe(res => {
      console.log(res);
    });
    this.activeModal.close();
  }
}

