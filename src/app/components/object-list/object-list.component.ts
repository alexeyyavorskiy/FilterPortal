import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {DataService} from './../../share/data.service';

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.scss']
})
export class ObjectListComponent implements OnInit, OnChanges {

  @Input() objects;
  @Input() editMode;
  @Input() parentName;
  @Input() form: FormGroup;
  @Input() params;
  @Output() editList = new EventEmitter();
  public headerClass: string;
  public isEdit = false;

  constructor(private dataService: DataService) {
  }

  public getHeaderClass() {
    if (this.params) {
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

  public edit(event) {
    this.editList.emit(event);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const value: SimpleChange = changes.objects;
    if (value && value.currentValue) {
      this.objects = value.currentValue;
    }
    this.getHeaderClass();
  }

  ngOnInit() {
    this.getHeaderClass();
  }
}
