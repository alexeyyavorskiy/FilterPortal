import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { DataObject } from "../../classes/data-object";
import { GlobalService } from "../../core/global.service";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit, OnChanges {
  @Input() size: number;
  @Input() object: DataObject;
  public white = '#fff';
  public green = '#12d54e';
  public orange = '#efb800';
  public red = '#db2244';
  public blue = '#00a4f3';
  public color15 = 'rgba(216, 226, 236, 1)';
  public r: number;
  public status: number;
  public color: string;
  public scale: number;
  public titleClass: string;

  constructor(private elRef: ElementRef, private globalService: GlobalService) {
  }

  @HostListener('window:resize', ['$event'])

  onResize(event) {
    this.scale = this.elRef.nativeElement.offsetHeight / 100;
  }

  private getTitleClass(val) {
    if (val) {
      if (val === 0 || val === 1) {
        return '';
      }
      if (val === 2) {
        return 'status__title--yellow';
      }
      if (val === 3 || val === 4) {
        return 'status__title--red';
      }
    }
  }

  getStateColor(val) {
    if (val) {
      if (val === 0) {
        return this.white;
      }
      if (val === 1) {
        return this.green;
      }
      if (val === 2) {
        return this.orange;
      }
      if (val === 3) {
        return this.red;
      }
      if (val === 4) {
        return this.red;
      }
    }
  }

  ngOnInit() {
    this.r = this.size / 2.3; // 2.2
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.scale = this.elRef.nativeElement.offsetHeight / 100;
    });
    const value: SimpleChange = changes.object;
    if (value.currentValue) {
      this.object = value.currentValue;
      this.status = this.object.value; // this.object.value;
      // this.globalService.setStatus(this.status);
      this.color = this.getStateColor(this.status);
      this.titleClass = this.getTitleClass(this.status);
    }
  }

}
