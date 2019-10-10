import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { DataService } from '../../share/data.service';
import { FormGroup } from "@angular/forms";
import { ParameterListBlockObject } from "../../classes/parameter-list-block-object";
import { GlobalService } from "../../core/global.service";

@Component({
  selector: 'app-parameter-list-block',
  templateUrl: './parameter-list-block.component.html',
  styleUrls: ['./parameter-list-block.component.scss']
})
export class ParameterListBlockComponent implements OnInit, OnChanges {

  @Input() objects: ParameterListBlockObject[];
  public editMode: boolean;
  public form: FormGroup;
  public formDataLoaded: boolean;

  constructor(private dataService: DataService, private globalService: GlobalService) {

  }

  private createFormGroup(objects) {
    const group: any = {};
    objects.forEach(parameterObject => {
      this.globalService.generateFormGroup(parameterObject.objects, group);
    });
    this.form = new FormGroup(group);
    this.formDataLoaded = true;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const value: SimpleChange = changes.objects;
    if (value.currentValue) {
      this.createFormGroup(value.currentValue);
    }
  }

  public editList(event) {
    this.editMode = true;
    this.dataService.stopTimer();
  }

  public save(value) {
    const testMap = new Map<string, any>(Object.entries(value));
    testMap.forEach((val, key) => {
      if (this.dataService.fullDataMap.get(key).data_type === 'Number') {
        val = +(val.toString().replace(',', '.')); // number data type objects takes only number values;
      }
      if (val && val !== null) {
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
