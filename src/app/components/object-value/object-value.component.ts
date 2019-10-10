import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataObject} from "../../classes/data-object";
import {DashboardBlockEvent} from "../../classes/dashboard-block-event";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-object-value',
  templateUrl: './object-value.component.html',
  styleUrls: ['./object-value.component.scss']
})

export class ObjectValueComponent implements OnInit {
  @Input() object: DataObject;
  @Input() editMode = false;
  @Input() parentName: string;
  @Input() form: FormGroup;
  @Output() edit = new EventEmitter<DashboardBlockEvent>();
  public focused: boolean;

  constructor() {
  }

  public onEdit() {
    this.edit.emit(new DashboardBlockEvent(this.parentName, true));
  }

  public focusFunction() {
    this.focused = true;
  }

  public focusOutFunction() {
    this.focused = false;
  }

  setBooleanFormControlValue(value: boolean) {
    this.form.controls[this.object.id].setValue(value);
  }

  ngOnInit(): void {
    this.focused = false;
  }

}
