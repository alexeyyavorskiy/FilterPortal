import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {DataObject} from "../../classes/data-object";
import {DataService} from "../../share/data.service";
import {ParameterListBlockObject} from "../../classes/parameter-list-block-object";
import {GlobalService} from "../../core/global.service";

@Component({
  selector: 'app-parameter-list',
  templateUrl: './parameter-list.component.html',
  styleUrls: ['./parameter-list.component.scss']
})

export class ParameterListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public filtrationUnitList: DataObject[];
  public bowerList: DataObject[];
  public dataMap: Map<any, any> = new Map();
  public preFilterList: DataObject[];
  public mainFilterList: DataObject[];
  public gasFilterList: DataObject[];
  public objectList: ParameterListBlockObject[];

  constructor(private globalService: GlobalService, private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getAllData(false).then(data => {
      this.dataMap = data;
      this.getAllObjectLists();
    });
    // this.dataService.getObjects().then(objects => {
    //   const uuidList: string[] = objects.data;
    //   uuidList.forEach(uuid => {
    //     this.dataService.getObjectMetaData(sessionStorage.getItem('sessionId'), uuid).then(meta => {
    //       console.log(`UUID: ${uuid}; Description: ${meta.data && meta.data.length ? meta.data[0].description : 'undefined'}`);
    //     })
    //   });
    // });
    this.subscription = this.dataService._fullDataMap.subscribe((val) => {
      this.dataMap = val;
      this.getAllObjectLists();
    })
  }

  private getAllObjectLists() {
    this.getFiltrationUnit();
    this.fillBlower();
    this.getPreFilterList();
    this.getMainFilterList();
    this.getGasFilterList();
    this.generateObjectList();
  }

  generateObjectList() {
    this.objectList = [];
    this.objectList.push(new ParameterListBlockObject('Parameter Filtration Unit', this.filtrationUnitList));
    this.objectList.push(new ParameterListBlockObject('Parameter Blower', this.bowerList));
    this.objectList.push(new ParameterListBlockObject('Filter 1 Parameter', this.preFilterList));
    this.objectList.push(new ParameterListBlockObject('Filter 2 Parameter', this.mainFilterList));
    this.objectList.push(new ParameterListBlockObject('Filter 3 Parameter', this.gasFilterList));
  }

  public getFiltrationUnit() {
    this.filtrationUnitList = [];

    this.globalService.addToList(this.dataMap, this.filtrationUnitList, 'd4983e17-227a-40aa-b6b6-df9d6d03f6fb');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, 'da440ef9-2572-44bb-a693-257c05132787');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, '20eac701-387e-4c1b-8c59-5daf55549c71');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, 'Fabrication no.');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, 'Local unit position');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, 'Local inventory number');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, 'Next Service');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, 'acfb8433-a026-4b01-bb74-4a0a5420d3e5');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, '42527985-c41d-4958-8412-09bb2fa4e255');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, '70537b20-fa3e-466b-9652-2a33a63f52ca');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, 'b425bd3f-70d4-4fca-ba18-6f754e93fdc6');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, '8be1c6c4-bd1e-4cfb-9ad6-628dd55ffd43');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, '5bfea5f0-ffe1-43e0-b4ee-361c67c04d9d');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, '4e85045b-678e-4f29-ba1e-2f2d56ffba35');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, 'ec9b8c9b-55da-402d-ae7e-97958fec2319');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, 'df6235d2-6fdc-4296-a572-891a04d16776');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, '14fa7e81-f2f5-4d5f-ad91-96c8a49e6120');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, '8ef60ae4-7122-4df0-a8fe-63413c53116e');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, 'b12dd904-5641-4c97-8ef6-72aac63f3a1f');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, 'ccce92f4-da15-4fe8-8ee6-370d4213892b');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, '3a132555-a12e-4032-907b-9820671ea2b1');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, '1d463dc8-565c-4768-b8c7-ce4235303053');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, 'ff2034db-8d14-4841-b283-18b0a303360e');
    this.globalService.addToList(this.dataMap, this.filtrationUnitList, '28d2447a-678e-4fac-8cb0-7c71f1033145');
  }

  private fillBlower() {
    this.bowerList = [];
    this.globalService.addToList(this.dataMap, this.bowerList, 'c05a7fa1-cdb9-4739-8d21-f18eb7cc00d8');
    this.globalService.addToList(this.dataMap, this.bowerList, 'a035cf25-79c3-42c8-8695-ea6fddc6cfbd');
    this.globalService.addToList(this.dataMap, this.bowerList, '79836281-b752-4155-b930-0fbe72fcdef2');
    this.globalService.addToList(this.dataMap, this.bowerList, '2322e0bb-a4eb-4aec-b0a6-a184b7375049'); // not sure
    this.globalService.addToList(this.dataMap, this.bowerList, 'e589d2b8-b81b-4da3-9447-a9b19fac1531');
    this.globalService.addToList(this.dataMap, this.bowerList, '09cb23ac-8646-4dad-9019-69d171c6547a');
    this.globalService.addToList(this.dataMap, this.bowerList, '3609f068-82e0-4284-bbb0-9698d5bb36a7');
    this.globalService.addToList(this.dataMap, this.bowerList, '378d3235-c753-4b1b-878b-6fda78119a90');
    this.globalService.addToList(this.dataMap, this.bowerList, '44d7f20d-c965-42cb-b8dd-d14c67fb6a5c');
    this.globalService.addToList(this.dataMap, this.bowerList, '87effa2d-b61c-4d4d-9e9f-3d373aade4b4');
    this.globalService.addToList(this.dataMap, this.bowerList, '9e135863-e3d0-407e-a9ce-ac3750d0d6a4');
    this.globalService.addToList(this.dataMap, this.bowerList, '0bbffdeb-421c-4460-8374-70879276af9b');
    this.globalService.addToList(this.dataMap, this.bowerList, '65d07178-9e9d-4916-bdbb-08dee0ebb894');
    this.globalService.addToList(this.dataMap, this.bowerList, '7be0e991-9609-4fa7-aa25-32414e946a4a');
    this.globalService.addToList(this.dataMap, this.bowerList, '4850bee0-ad4c-493f-8437-9bfcf02001ae');
    this.globalService.addToList(this.dataMap, this.bowerList, '4015859b-0896-4e7f-a997-fcd4a82eebdd');
    this.globalService.addToList(this.dataMap, this.bowerList, 'abbe4c9c-b925-4320-8a7c-74131d217c58');
  }

  private getPreFilterList() {
    this.preFilterList = [];
    this.globalService.addToList(this.dataMap, this.preFilterList, 'f422a806-ae33-4843-9bd8-64ac56918af4');
    this.globalService.addToList(this.dataMap, this.preFilterList, '937f0c38-89cc-44be-ba63-ed4f35e1ee4e');
    this.globalService.addToList(this.dataMap, this.preFilterList, '9c953abc-d739-4006-abc5-882dbfe41b94');
    this.globalService.addToList(this.dataMap, this.preFilterList, '65d2e367-c595-4d47-a830-b16e8af542ae');
    this.globalService.addToList(this.dataMap, this.preFilterList, '924c04c1-3f80-43d2-a73f-7e5c01b106de');
    this.globalService.addToList(this.dataMap, this.preFilterList, 'c1b40060-aa37-4f4b-85ac-954830cd2764');
    this.globalService.addToList(this.dataMap, this.preFilterList, 'e3b2ae17-61aa-4596-8fad-e8c583716c4d');
    this.globalService.addToList(this.dataMap, this.preFilterList, 'd7d2ce99-32f3-416d-a03b-82a15823f4d3');
    this.globalService.addToList(this.dataMap, this.preFilterList, '2000d15a-6c65-481d-a6f0-3a48641f752d');
    this.globalService.addToList(this.dataMap, this.preFilterList, 'bce6ba08-ac5d-4678-ae4b-61a25a150fe3');
    this.globalService.addToList(this.dataMap, this.preFilterList, 'a9de3e29-3ffa-4684-8c89-f76655f515b7');

  }

  private getMainFilterList() {
    this.mainFilterList = [];
    this.globalService.addToList(this.dataMap, this.mainFilterList, '48a94bce-04fa-42e9-b770-a2cffe18e267');
    this.globalService.addToList(this.dataMap, this.mainFilterList, '5dea8c6e-a06e-4e9e-96e5-c6630ce20f64');
    this.globalService.addToList(this.dataMap, this.mainFilterList, '447806bc-cbb4-4e14-8b49-42b77a0688e8');
    this.globalService.addToList(this.dataMap, this.mainFilterList, 'e7f89425-b57f-4a23-befa-c481f815022d');
    this.globalService.addToList(this.dataMap, this.mainFilterList, 'c27e0c6e-0cf2-4250-a04c-dd507c4ae8d5');
    this.globalService.addToList(this.dataMap, this.mainFilterList, '8366688d-4669-4da2-9e46-86a416b26ac3');
    this.globalService.addToList(this.dataMap, this.mainFilterList, 'c2e05d53-5570-4b43-ab7a-2bacf2e7e1dc');
    this.globalService.addToList(this.dataMap, this.mainFilterList, '558ee7ea-6e53-42c9-b744-26d1e85f8ea7');
    this.globalService.addToList(this.dataMap, this.mainFilterList, '4cdc10f3-7adb-4fc4-82f4-67d7a3818f63');
    this.globalService.addToList(this.dataMap, this.mainFilterList, '355307b4-4f81-4a72-b627-10492f018e27');
  }

  private getGasFilterList() {
    this.gasFilterList = [];
    this.globalService.addToList(this.dataMap, this.gasFilterList, '0671bc92-3c67-4f15-852e-e72cf6d5d001');
    this.globalService.addToList(this.dataMap, this.gasFilterList, '3e3409c1-c233-4057-8529-f8894649e26f');
    this.globalService.addToList(this.dataMap, this.gasFilterList, '42c9da5f-d062-452b-b1db-e194b148ee6a');
    this.globalService.addToList(this.dataMap, this.gasFilterList, '76d19b53-a68f-4641-9874-fddd17def439');
    this.globalService.addToList(this.dataMap, this.gasFilterList, 'd725f8c7-9492-4764-bdae-57c2cd3494b7');
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

}
