import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {DataObject} from "../../classes/data-object";
import {FilterParams} from "../../classes/filter-params";

@Component({
  selector: 'app-diagram-block',
  templateUrl: './diagram-block.component.html',
  styleUrls: ['./diagram-block.component.scss']
})
export class DiagramBlockComponent implements OnInit, OnChanges {
  @Input() objects: DataObject[];
  public status: DataObject;
  public preFilter: DataObject;
  public mainFilter: DataObject;
  public gasFilterList: DataObject[];
  public preFilterParams: FilterParams;
  public mainFilterParams: FilterParams;
  public sliderValue: number;
  public sliderObject: DataObject;
  public sliderRemoteObject: DataObject;
  public toggleObject: DataObject;
  public preFilterValue: number;
  public mainFilterValue: number;
  public gasFilterValue: number;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const value: SimpleChange = changes.objects;
    if (value.currentValue) {
      this.objects = value.currentValue;
      this.status = this.objects[0];
      this.preFilter = this.objects[1];
      this.preFilterValue = 1; // this.objects[2].value;
      this.mainFilter = this.objects[3];
      this.mainFilterValue = 1; // this.objects[4].value;
      this.gasFilterList = [];
      this.gasFilterList.push(this.objects[5]);
      this.gasFilterList.push(this.objects[6]);
      this.gasFilterValue = 1; // this.objects[7].value;
      this.preFilterParams = new FilterParams('Pre Filter', 100);
      this.mainFilterParams = new FilterParams('Main Filter', 100);
      this.sliderValue = this.objects[8].value;
      this.sliderObject = this.objects[9];
      this.sliderRemoteObject = this.objects[10];
      this.toggleObject = this.objects[11];
    }
  }
}
