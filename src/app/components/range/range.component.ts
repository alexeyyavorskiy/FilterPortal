import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {DataObject} from "../../classes/data-object";
import {DataService} from "../../share/data.service";

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})

export class RangeComponent implements OnInit, OnChanges {
  @Input() value: number;
  @Input() sliderObject: DataObject;
  @Input() toggleObject: DataObject;
  @Input() sliderRemoteObject: DataObject;

  autoTicks = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  vertical = false;
  toggle: boolean;
  public toggleDisabled = !this.toggle;
  public sliderDisabled = !this.toggle;

  constructor(private dataService: DataService) {
    // this.value = 0;
  }

  ngOnInit() {
  }

  changeEvent(obj) {
    this.value = obj.value;
  }

  changeInput(obj) {
    // console.log('changed Input');
    this.dataService.setObjectValue(this.sliderObject.id, obj.value);
    sessionStorage.setItem('sliderValue', obj.value);
  }

  changeToggle(checked) {
    // console.log('Changed value');
    this.setToggleValue(checked);
    this.sliderDisabled = !checked;
  }

  setToggleValue(value) {
    this.toggle = value;
    this.dataService.setObjectValue(this.toggleObject.id, value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const value: SimpleChange = changes.value;
    if (value) {
      if (this.sliderRemoteObject) { // remote mode
        this.setToggleValue(false);
        this.toggleDisabled = this.sliderRemoteObject.value;
        this.sliderDisabled = !this.toggle;
        if (!this.sliderRemoteObject.value && this.toggleObject) { // remote mode off
          this.toggle = this.toggleObject.value;
        }
      }
      if (value.previousValue) {
        sessionStorage.setItem('sliderValue', value.currentValue); // when slider changed position
      }
    } else {
      if (sessionStorage.getItem('sliderValue')) {
        this.value = +sessionStorage.getItem('sliderValue'); // when page refreshed
      }
    }
  }
}
