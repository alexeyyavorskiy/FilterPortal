import {Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {GlobalService} from "../../core/global.service";
import {DataObject} from "../../classes/data-object";
import {FilterParams} from "../../classes/filter-params";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnChanges {
  @Input() object: DataObject;
  @Input() params: FilterParams;
  public strokeDashArray = 565.48;
  public r: number;
  public strokeDashoffset = 0;
  public maxValue = 100;
  public color10 = 'rgba(229, 236, 242, 1)';
  public color100 = 'rgba(0, 68, 135, 1)';
  public value: number;
  public scale: number;

  @HostListener('window:resize', ['$event'])

  onResize(event) {
    this.scale = this.elRef.nativeElement.offsetHeight / 100;
  }

  constructor(private globalService: GlobalService, private elRef: ElementRef) {
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
    return `rotate(90, ${this.params.size / 2}, ${this.params.size / 2})`
  }

  public getFilterColor(val) {
   return this.globalService.getFilterColor(val);
  }

  ngOnInit() {
    this.r = this.params.size / 2.3; // 2.2
    setTimeout(() => {
      this.getFilterAngleValue(this.object.value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.scale = this.elRef.nativeElement.offsetHeight / 100;
    });
    const value: SimpleChange = changes.object;
    if (value.currentValue) {
      this.object = value.currentValue;
      this.value = this.object.value;
      this.getFilterAngleValue(this.value);
    }
  }

}
