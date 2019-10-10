import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { DataObject } from "../../classes/data-object";
import { DataService } from "../../share/data.service";
import { Subscription } from "rxjs/Subscription";
import { DashboardBlockParams } from "../../classes/dashboard-block-params";
import { GlobalService } from "../../core/global.service";

@Component({
  selector: 'app-edit-network',
  templateUrl: './edit-network.component.html',
  styleUrls: ['./edit-network.component.scss']
})
export class EditNetworkComponent implements OnInit, OnDestroy {
  public editNetworkList: DataObject[];
  private dataMap: Map<string, DataObject>;
  private subscription: Subscription;
  public editNetworkParams: DashboardBlockParams;

  constructor(private globalService: GlobalService,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getAllData(false).then(data => {
      this.dataMap = data;
      this.getEditNetworkList();
      this.editNetworkParams = new DashboardBlockParams(null, 'Edit Network Settings', false, false, false);
    });
    this.subscription = this.dataService._fullDataMap.subscribe((val) => {
      this.dataMap = val;
      this.getEditNetworkList();
    })
  }


  public getEditNetworkList() {
    this.editNetworkList = [];
    this.globalService.addToList(this.dataMap, this.editNetworkList, '96e5d66b-e21b-4eb3-9fdd-d7dd399041fc');
    this.globalService.addToList(this.dataMap, this.editNetworkList, '93d434ca-4c61-47a0-85ba-1198dc6e1b8b');
    this.globalService.addToList(this.dataMap, this.editNetworkList, '2c17243e-b1d8-4fff-a52b-db1d3dfb74d1');
    this.globalService.addToList(this.dataMap, this.editNetworkList, 'e589d2b8-b81b-4da3-9447-a9b19fac1531');
    this.globalService.addToList(this.dataMap, this.editNetworkList, '56b213ae-c72a-4bec-89c6-99487c0cd51f');
    this.globalService.addToList(this.dataMap, this.editNetworkList, 'SSID');
    this.globalService.addToList(this.dataMap, this.editNetworkList, 'Verschlüsselungstyp');
    this.globalService.addToList(this.dataMap, this.editNetworkList, 'b3d3334d-547e-4f4b-9e59-da89ab59b7f0');
    this.globalService.addToList(this.dataMap, this.editNetworkList, 'f89c250c-61bc-4689-9dea-bd84d8ee997b');
    this.globalService.addToList(this.dataMap, this.editNetworkList, '6386858a-e11c-4266-bb2d-c821747e6e61');
    this.globalService.addToList(this.dataMap, this.editNetworkList, 'Activate default values');
    this.globalService.addToList(this.dataMap, this.editNetworkList, 'Default SSID');
    this.globalService.addToList(this.dataMap, this.editNetworkList, 'Default password');
    this.globalService.addToList(this.dataMap, this.editNetworkList, 'Default Verschlüsselungstyp');
    this.globalService.addToList(this.dataMap, this.editNetworkList, 'Default Ländercode');
    this.globalService.addToList(this.dataMap, this.editNetworkList, 'Default Wifi-Kanal');
    this.globalService.addToList(this.dataMap, this.editNetworkList, 'ee58a1ac-792d-4a5d-a538-17ba48d73021');
    this.globalService.addToList(this.dataMap, this.editNetworkList, '999b8813-c827-42ce-bbd1-a772fee81524');
    this.globalService.addToList(this.dataMap, this.editNetworkList, 'c243ddaf-459b-4db0-91ad-5b432434cac5');
    this.globalService.addToList(this.dataMap, this.editNetworkList, '5c48f27f-6d32-4304-960e-3b685eff41be');
    this.globalService.addToList(this.dataMap, this.editNetworkList, 'eda737d9-c458-4567-8a51-1dea4a89b5fb');
    this.globalService.addToList(this.dataMap, this.editNetworkList, '6f64cee6-b644-4ec1-b6f6-48ba31f61633');
    this.globalService.addToList(this.dataMap, this.editNetworkList, '225a30de-d1da-4de8-920c-6211848bb7d5');
    this.globalService.addToList(this.dataMap, this.editNetworkList, 'b511c046-224b-4abf-888f-9174d7511511');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
