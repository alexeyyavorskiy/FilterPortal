import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from "../../core/global.service";
import {DataService} from "../../share/data.service";
import {Subscription} from "rxjs/Subscription";
import {DataObject} from "../../classes/data-object";
import {AuthService} from "../../share/auth.service";
import {DashboardBlockParams} from "../../classes/dashboard-block-params";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private dataMap: Map<string, DataObject>;
  private subscription: Subscription;
  public filtrationUnitList: DataObject[];
  public diagramObjectList: DataObject[];
  public blowerList: DataObject[];
  public preFilterList: DataObject[];
  public mainFilterList: DataObject[];
  public gasFilterList: DataObject[];
  public preFilterParams: DashboardBlockParams;
  public mainFilterParams: DashboardBlockParams;
  public gasFilterParams: DashboardBlockParams;
  public filtrationUnitParams: DashboardBlockParams;
  public blowerParams: DashboardBlockParams;
  public preFilterValue: number;
  public mainFilterValue: number;
  public gasFilterValue: number;


  constructor(private globalService: GlobalService, private authService: AuthService, private dataService: DataService) {
  }

  ngOnInit() {
    this.getData();
    // this.dataService.getObjects().then(data => {
    //   console.log(data);
    // });
    this.subscription = this.dataService._fullDataMap.subscribe((val) => {
      this.dataMap = val;
      this.getAllObjectLists();
    })
  }

  private getData() {
    this.dataService.getAllData(false).then(data => {
      this.dataMap = data;
      if (this.dataMap) {
        this.getAllObjectLists();
      }
    });
  }

  private getAllObjectLists() {
    this.getDiagramObjectList();
    this.getFiltrationUnit();
    this.getBlowerList();
    this.getPreFilterList();
    this.getMainFilterList();
    this.getGasFilterList();
    this.filtrationUnitParams = new DashboardBlockParams(null, 'Filtration Unit', true, false, false);
    this.blowerParams = new DashboardBlockParams(null, 'Blower', false, false, false);
    const preFilterObject = this.dataMap.get('65d2e367-c595-4d47-a830-b16e8af542ae');
    this.preFilterParams = new DashboardBlockParams(preFilterObject ? preFilterObject.value : 0, 'Pre Filter Details',
      false, true, true, 'a612254f-0044-4610-b5c5-040f2d3e68e5', '65d2e367-c595-4d47-a830-b16e8af542ae');
    const mainFilterObject = this.dataMap.get('e7f89425-b57f-4a23-befa-c481f815022d');
    this.mainFilterParams = new DashboardBlockParams(mainFilterObject ? mainFilterObject.value : 0, 'Main Filter Details',
      false, true, true, '3488cd9b-b521-4a19-8abb-89b56ae03a2a', 'e7f89425-b57f-4a23-befa-c481f815022d');
    const gasFilterObject = this.dataMap.get('3e3409c1-c233-4057-8529-f8894649e26f');
    this.gasFilterParams = new DashboardBlockParams(gasFilterObject ? gasFilterObject.value : 0, 'Gas Filter Details',
      false, true, false, '273cf002-96a4-40ea-8ca9-49caf4360902');
    this.preFilterValue = 1; // this.dataMap.get('9c953abc-d739-4006-abc5-882dbfe41b94').value;
    this.mainFilterValue = 1; // this.dataMap.get('447806bc-cbb4-4e14-8b49-42b77a0688e8').value;
    this.gasFilterValue = 1; // this.dataMap.get('0671bc92-3c67-4f15-852e-e72cf6d5d001').value;
    // last 3 values used to show/hide current filter component on dashboard page
  }

  private getFiltrationUnit() {
    this.filtrationUnitList = [];
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, '20eac701-387e-4c1b-8c59-5daf55549c71');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, 'Local Unit Position');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, 'Local Inventory Nr.');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, 'acfb8433-a026-4b01-bb74-4a0a5420d3e5');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, 'Next Service');
  }

  private getDiagramObjectList() {
    this.diagramObjectList = [];
    this.globalService.addToList(this.dataMap, this.diagramObjectList, 'ccce92f4-da15-4fe8-8ee6-370d4213892b'); // status
    this.globalService.addToList(this.dataMap, this.diagramObjectList, '65d2e367-c595-4d47-a830-b16e8af542ae'); // pre filter %
    this.globalService.addToList(this.dataMap, this.diagramObjectList, '9c953abc-d739-4006-abc5-882dbfe41b94'); // pre filter value
    this.globalService.addToList(this.dataMap, this.diagramObjectList, 'e7f89425-b57f-4a23-befa-c481f815022d'); // main filter %
    this.globalService.addToList(this.dataMap, this.diagramObjectList, '447806bc-cbb4-4e14-8b49-42b77a0688e8'); // main filter value
    this.globalService.addToList(this.dataMap, this.diagramObjectList, '3e3409c1-c233-4057-8529-f8894649e26f'); // gas filter %
    this.globalService.addToList(this.dataMap, this.diagramObjectList, '42c9da5f-d062-452b-b1db-e194b148ee6a'); // gas filter maxValue
    this.globalService.addToList(this.dataMap, this.diagramObjectList, '0671bc92-3c67-4f15-852e-e72cf6d5d001'); // gas filter value
    this.globalService.addToList(this.dataMap, this.diagramObjectList, '79836281-b752-4155-b930-0fbe72fcdef2'); // slider value
    this.globalService.addToList(this.dataMap, this.diagramObjectList, '2322e0bb-a4eb-4aec-b0a6-a184b7375049'); // slider object
    this.globalService.addToList(this.dataMap, this.diagramObjectList, 'e589d2b8-b81b-4da3-9447-a9b19fac1531'); // slider object
    this.globalService.addToList(this.dataMap, this.diagramObjectList, '2c17243e-b1d8-4fff-a52b-db1d3dfb74d1'); // slider object
  }

  private getBlowerList() {
    this.blowerList = [];
    this.globalService.addToList(this.dataMap, this.blowerList, 'c05a7fa1-cdb9-4739-8d21-f18eb7cc00d8');
    this.globalService.addToList(this.dataMap, this.blowerList, 'Measured Value');
    this.globalService.addToList(this.dataMap, this.blowerList, 'Setpoint Value');
    this.globalService.addToList(this.dataMap, this.blowerList, 'bce6ba08-ac5d-4678-ae4b-61a25a150fe3');
    this.globalService.addToList(this.dataMap, this.blowerList, 'a035cf25-79c3-42c8-8695-ea6fddc6cfbd');
    this.globalService.addToList(this.dataMap, this.blowerList, '7be0e991-9609-4fa7-aa25-32414e946a4a');
  }

  private getPreFilterList() {
    this.preFilterList = [];
    this.globalService.addToList(this.dataMap, this.preFilterList, '9c953abc-d739-4006-abc5-882dbfe41b94');
    this.globalService.addToList(this.dataMap, this.preFilterList, '937f0c38-89cc-44be-ba63-ed4f35e1ee4e');
    this.globalService.addToList(this.dataMap, this.preFilterList, 'c1b40060-aa37-4f4b-85ac-954830cd2764');
    this.globalService.addToList(this.dataMap, this.preFilterList, 'e3b2ae17-61aa-4596-8fad-e8c583716c4d');
  }

  private getMainFilterList() {
    this.mainFilterList = [];
    this.globalService.addToList(this.dataMap, this.mainFilterList, '447806bc-cbb4-4e14-8b49-42b77a0688e8');
    this.globalService.addToList(this.dataMap, this.mainFilterList, '5dea8c6e-a06e-4e9e-96e5-c6630ce20f64');
    this.globalService.addToList(this.dataMap, this.mainFilterList, '8366688d-4669-4da2-9e46-86a416b26ac3');
    this.globalService.addToList(this.dataMap, this.mainFilterList, 'c2e05d53-5570-4b43-ab7a-2bacf2e7e1dc');
  }

  private getGasFilterList() {
    this.gasFilterList = [];
    this.globalService.addToList(this.dataMap, this.gasFilterList, '0671bc92-3c67-4f15-852e-e72cf6d5d001');
    this.globalService.addToList(this.dataMap, this.gasFilterList, '76d19b53-a68f-4641-9874-fddd17def439');
    this.globalService.addToList(this.dataMap, this.gasFilterList, '3e3409c1-c233-4057-8529-f8894649e26f');
    this.globalService.addToList(this.dataMap, this.gasFilterList, '42c9da5f-d062-452b-b1db-e194b148ee6a');
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

}
