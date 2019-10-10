import {Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {DataObject} from "../../classes/data-object";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-gas-filter',
  templateUrl: './gas-filter.component.html',
  styleUrls: ['./gas-filter.component.scss']
})

export class GasFilterComponent implements OnInit, OnChanges {
  @Input() objects: DataObject[];
  @Input() size: number;
  public strokeDashArray = 565.48;
  public r: number;
  public strokeDashoffset = 0;
  public maxValue = 100;
  public color10 = 'rgba(229, 236, 242, 1)';
  public color100 = 'rgba(0, 68, 135, 1)';
  public color40 = 'rgba(153, 180, 207, 1)';
  private subscription: Subscription;
  private dataMap: Map<string, any>;
  public hours: number;
  public maxHours: number;
  public scale: number;

  constructor(private elRef: ElementRef) {
  }

  @HostListener('window:resize', ['$event'])

  onResize(event) {
    this.scale = this.elRef.nativeElement.offsetHeight / 100;
  }


  getFilterAngleValue(val) {
    if (isNaN(val)) {
      val = this.maxValue;
    } else {
      const r = this.r;
      const c = Math.PI * (100 / this.maxValue) * (r * 2);
      if (val < 0) {
        val = 0;
      }
      if (val > this.maxValue) {
        val = this.maxValue;
      }
      this.strokeDashoffset = this.strokeDashArray - ((val) / 100) * c;
    }
  }

  public getTransformAttr() {
    return `rotate(90, ${this.size / 2}, ${this.size / 2})`
  }

  ngOnInit() {
    this.r = this.size / 2.3;
    setTimeout(() => {
      this.getFilterAngleValue((this.hours / this.maxHours) * 100);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.scale = this.elRef.nativeElement.offsetHeight / 100;
    });
    const value: SimpleChange = changes.objects;
    if (value.currentValue && value.currentValue.length >= 2) {
      this.hours = value.currentValue[0].value;
      this.maxHours = value.currentValue[1].value;
      this.getFilterAngleValue((this.hours / this.maxHours) * 100);
    }
  }

}
