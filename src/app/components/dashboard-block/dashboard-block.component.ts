import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {DataObject} from "../../classes/data-object";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgbdModalContentComponent} from '../modal/modal.component';
import {DashboardBlockParams} from "../../classes/dashboard-block-params";
import {DataService} from '../../share/data.service';
import {FormGroup} from "@angular/forms";
import {GlobalService} from "../../core/global.service";

@Component({
  selector: 'app-dashboard-block',
  templateUrl: './dashboard-block.component.html',
  styleUrls: ['./dashboard-block.component.scss']
})
export class DashboardBlockComponent implements OnInit, OnChanges, OnDestroy {

  @Input() objects: DataObject[];
  @Input() params: DashboardBlockParams;
  public headerClass: string;
  public editMode: boolean;
  public form: FormGroup;
  public formDataLoaded: boolean;
  public periodButtonText: string;
  private allText = 'All data';
  private thirtyDaysText = 'Last 30 days';

  constructor(private modalService: NgbModal, private dataService: DataService, private globalService: GlobalService) {
  }

  private createFormGroup(objects) {
    const group: any = {};
    this.globalService.generateFormGroup(objects, group);
    this.form = new FormGroup(group);
    this.formDataLoaded = true;
  }

  public getHeaderClass() {
    if (this.params && this.params.showHeader) {
      if (this.params.dynamicColor) {
        if (this.params.value === 100) {
          this.headerClass = 'parameter--red'; // '#db2244'
        } else if (this.params.value >= 80 && this.params.value < 100) {
          this.headerClass = 'parameter--yellow' // '#efb800'
        } else {
          this.headerClass = 'parameter--green';  // '#12d54e'
        }
      } else {
        this.headerClass = 'parameter--blue';
      }
    }
  }

  ngOnInit() {
    this.getHeaderClass();
    if (this.params && this.params.filterId) {
      if (sessionStorage.getItem(this.params.filterId) && sessionStorage.getItem(this.params.filterId) === '0') {
        this.periodButtonText = this.thirtyDaysText;
      } else {
        this.periodButtonText = this.allText;
      }
    }
  }

  setDataPeriod() {
    if (this.periodButtonText === this.allText) {
      this.periodButtonText = this.thirtyDaysText;
      sessionStorage.setItem(this.params.filterId, '0');
    } else {
      this.periodButtonText = this.allText;
      sessionStorage.setItem(this.params.filterId, '30');
    }
    this.dataService.getChartDataWithSubscribe(this.params.filterId);
  }

  open(data: any, block: string) {
    this.dataService.sendDataToModal(data, block);
    const modalRef = this.modalService.open(NgbdModalContentComponent, {backdrop: 'static', centered: true});
    modalRef.componentInstance.id = this.params.replaceId;
    modalRef.componentInstance.newId = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    const value: SimpleChange = changes.objects;
    if (value.currentValue) {
      this.getHeaderClass();
      this.createFormGroup(value.currentValue);
    }
  }

  ngOnDestroy() {
  }

  downloadEvents() {
    this.dataService.downloadEvents();
    return false;
  }

  public editList(event) {
    this.editMode = true;
    this.dataService.stopTimer();
  }

  public save(value) {
    const testMap = new Map<string, any>(Object.entries(value));
    testMap.forEach((val, key) => {
      if (val !== null) {
        if (this.dataService.fullDataMap.get(key).data_type === 'Number') {
          val = +(val.toString().replace(',', '.')); // number data type objects takes only number values;
        }
        this.dataService.setObjectValue(key, val);
      }
    });
    this.dataService.startTimer();
    this.editMode = false;
  }

  public cancel() {
    // console.log('cancel');
    this.dataService.startTimer();
    this.editMode = false;
  }

}
