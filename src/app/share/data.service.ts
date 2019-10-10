import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {DataObject} from "../classes/data-object";
import {Subject} from "rxjs/Subject";
import {GlobalService} from "../core/global.service";
import * as FileSaver from 'file-saver';
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class DataService implements OnInit, OnDestroy {
  private _serverUrl: string;
  private _fullDataMapValue: Map<string, DataObject> = new Map();
  public _fullDataMap: Subject<Map<string, DataObject>> = new Subject();
  public chartData: any = new Subject();
  private objectValuesPromises = [];
  private objectMetaDataPromises = [];
  public dataMap: Map<string, any> = new Map();
  private timer: any;
  modalData: any;
  private filter_one_id = '65d2e367-c595-4d47-a830-b16e8af542ae';
  private filter_two_id = 'e7f89425-b57f-4a23-befa-c481f815022d';
  private _files: string[];
  private getJsonSubscription: Subscription;
  private getChartDataSubscription: Subscription;
  private getLocalEventsSubscription: Subscription;
  private objects = [
    '65d2e367-c595-4d47-a830-b16e8af542ae',
    'e7f89425-b57f-4a23-befa-c481f815022d',
    'a035cf25-79c3-42c8-8695-ea6fddc6cfbd',
    'e589d2b8-b81b-4da3-9447-a9b19fac1531',
    'bce6ba08-ac5d-4678-ae4b-61a25a150fe3',
    '712e5f41-0329-4134-9eff-5e4747981af7',
    '924c04c1-3f80-43d2-a73f-7e5c01b106de',
    'c27e0c6e-0cf2-4250-a04c-dd507c4ae8d5',
    '09cb23ac-8646-4dad-9019-69d171c6547a',
    '79836281-b752-4155-b930-0fbe72fcdef2',
    '2322e0bb-a4eb-4aec-b0a6-a184b7375049',
    '3609f068-82e0-4284-bbb0-9698d5bb36a7',
    '5bfea5f0-ffe1-43e0-b4ee-361c67c04d9d',
    'acfb8433-a026-4b01-bb74-4a0a5420d3e5',
    '42527985-c41d-4958-8412-09bb2fa4e255',
    'c1b40060-aa37-4f4b-85ac-954830cd2764',
    '8366688d-4669-4da2-9e46-86a416b26ac3',
    '3e3409c1-c233-4057-8529-f8894649e26f',
    '7be0e991-9609-4fa7-aa25-32414e946a4a',
    'ccce92f4-da15-4fe8-8ee6-370d4213892b',
    '378d3235-c753-4b1b-878b-6fda78119a90',
    '44d7f20d-c965-42cb-b8dd-d14c67fb6a5c',
    'e3b2ae17-61aa-4596-8fad-e8c583716c4d',
    'c2e05d53-5570-4b43-ab7a-2bacf2e7e1dc',
    '42c9da5f-d062-452b-b1db-e194b148ee6a',
    '70537b20-fa3e-466b-9652-2a33a63f52ca',
    'b425bd3f-70d4-4fca-ba18-6f754e93fdc6',
    '87effa2d-b61c-4d4d-9e9f-3d373aade4b4',
    '9e135863-e3d0-407e-a9ce-ac3750d0d6a4',
    '0bbffdeb-421c-4460-8374-70879276af9b',
    'd7d2ce99-32f3-416d-a03b-82a15823f4d3',
    '2000d15a-6c65-481d-a6f0-3a48641f752d',
    '558ee7ea-6e53-42c9-b744-26d1e85f8ea7',
    '4cdc10f3-7adb-4fc4-82f4-67d7a3818f63',
    'a9de3e29-3ffa-4684-8c89-f76655f515b7',
    '355307b4-4f81-4a72-b627-10492f018e27',
    '3a132555-a12e-4032-907b-9820671ea2b1',
    '4850bee0-ad4c-493f-8437-9bfcf02001ae',
    '4015859b-0896-4e7f-a997-fcd4a82eebdd',
    '65d07178-9e9d-4916-bdbb-08dee0ebb894',
    '4e85045b-678e-4f29-ba1e-2f2d56ffba35',
    '9c953abc-d739-4006-abc5-882dbfe41b94',
    '447806bc-cbb4-4e14-8b49-42b77a0688e8',
    '0671bc92-3c67-4f15-852e-e72cf6d5d001',
    'abbe4c9c-b925-4320-8a7c-74131d217c58',
    '1d463dc8-565c-4768-b8c7-ce4235303053',
    'ff2034db-8d14-4841-b283-18b0a303360e',
    '28d2447a-678e-4fac-8cb0-7c71f1033145',
    'c05a7fa1-cdb9-4739-8d21-f18eb7cc00d8',
    'ec9b8c9b-55da-402d-ae7e-97958fec2319',
    'df6235d2-6fdc-4296-a572-891a04d16776',
    '14fa7e81-f2f5-4d5f-ad91-96c8a49e6120',
    '8ef60ae4-7122-4df0-a8fe-63413c53116e',
    'b12dd904-5641-4c97-8ef6-72aac63f3a1f',
    '20eac701-387e-4c1b-8c59-5daf55549c71',
    '8be1c6c4-bd1e-4cfb-9ad6-628dd55ffd43',
    'da440ef9-2572-44bb-a693-257c05132787',
    'd4983e17-227a-40aa-b6b6-df9d6d03f6fb',
    '937f0c38-89cc-44be-ba63-ed4f35e1ee4e',
    '5dea8c6e-a06e-4e9e-96e5-c6630ce20f64',
    '76d19b53-a68f-4641-9874-fddd17def439',
    'f422a806-ae33-4843-9bd8-64ac56918af4',
    '48a94bce-04fa-42e9-b770-a2cffe18e267',
    'd725f8c7-9492-4764-bdae-57c2cd3494b7',
    '6386858a-e11c-4266-bb2d-c821747e6e61',
    'f89c250c-61bc-4689-9dea-bd84d8ee997b',
    '2c17243e-b1d8-4fff-a52b-db1d3dfb74d1',
    'e589d2b8-b81b-4da3-9447-a9b19fac1531',
    '96e5d66b-e21b-4eb3-9fdd-d7dd399041fc',
    '93d434ca-4c61-47a0-85ba-1198dc6e1b8b',
    '2c17243e-b1d8-4fff-a52b-db1d3dfb74d1',
    '56b213ae-c72a-4bec-89c6-99487c0cd51f',
    '298626ff-9528-439b-bf2c-71fe45439e3f',
    'b3d3334d-547e-4f4b-9e59-da89ab59b7f0',
    'ee58a1ac-792d-4a5d-a538-17ba48d73021',
    '999b8813-c827-42ce-bbd1-a772fee81524',
    'c243ddaf-459b-4db0-91ad-5b432434cac5',
    '5c48f27f-6d32-4304-960e-3b685eff41be',
    'eda737d9-c458-4567-8a51-1dea4a89b5fb',
    '6f64cee6-b644-4ec1-b6f6-48ba31f61633',
    '225a30de-d1da-4de8-920c-6211848bb7d5',
    'b511c046-224b-4abf-888f-9174d7511511'
  ];

  constructor(private http: Http,
              private globalService: GlobalService) {
    if (sessionStorage.getItem('sessionId')) {
      this.startTimer();
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.getJsonSubscription) {
      this.getJsonSubscription.unsubscribe();
    }
    if (this.getJsonSubscription) {
      this.getChartDataSubscription.unsubscribe();
    }
    if (this.getLocalEventsSubscription) {
      this.getLocalEventsSubscription.unsubscribe();
    }
  }

  startTimer() {
    if (!this.timer) {
      // this.getAllData(true);
      // this.getChartListData();
      this.timer = setInterval(() => {
        this.getAllData(true);
        this.getChartListData();
      }, 10000);
    }
  }

  loadConfigFromJsonFile(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.getJsonSubscription = this.getJSON().subscribe((data) => {
        this._serverUrl = data.serverUrl;
        this._files = data.files;
        console.log(`Server url: '${this._serverUrl}' (initialized on app start)`);
        console.log(`Files: '${this._files}'`);
        resolve(true);
      })
    });
  }

  sendDataToModal(data: any, block: string) {
    this.modalData = data;
    this.modalData.block = block;
  }

  stopTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }

  setFullDataMap(val: Map<string, DataObject>) {
    this._fullDataMapValue = val;
    this._fullDataMap.next(val);
  }

  get fullDataMap() {
    return this._fullDataMapValue;
  }

  setChartData(val: any) {
    this.chartData.next(val);
  }

  get serverUrl(): string {
    return this._serverUrl;
  }

  get files(): string[] {
    return this._files;
  }

  public getJSON(): Observable<any> {
    return this.http.get('../../config/config.json')
      .map(res => res.json())
  }

  public getLocalEvents(fileName): Observable<any> {
    return this.http.get(`../files/${fileName}`)
      .map(res => res.text())
  }

  public about() {
    const session = sessionStorage.getItem('sessionId');
    return this.http.post(this._serverUrl, {
      "jsonrpc": "2.0", "id": 1, "method": "ults3.about", "params": {session}
    }).map(res => res.json().result).toPromise();
  }

  public getObjects() {
    const session = sessionStorage.getItem('sessionId');
    return this.http.post(this._serverUrl, {
      "jsonrpc": "2.0", "id": 1, "method": "ults3.getObjects", "params": {session}
    }).map(res => res.json().result).toPromise();
  }

  public getObjectMetaData(session, object) {
    return this.http.post(this._serverUrl, {
      "jsonrpc": "2.0", "id": 1, "method": "ults3.getObjectMetadata", "params": [session, object]
    }).map(res => res.json().result).toPromise();
  }

  public getObjectValues(session, objects) {
    return this.http.post(this._serverUrl, {
      "jsonrpc": "2.0", "id": 1, "method": "ults3.getObjectValues", "params": [session, objects]
    }).map(res => res.json().result).toPromise();
  }

  public setObjectValue(object, value) {
    return this.http.post(this._serverUrl, {
      "jsonrpc": "2.0", "id": 1, "method": "ults3.setObjectValue", "params": [sessionStorage.getItem('sessionId'), object, value]
    }).map(res => res.json().result).toPromise();
  }

  public queryShortTermDataValues(object, from, to, offset, limit) {
    return this.http.post(this._serverUrl, {
      "jsonrpc": "2.0", "id": 1, "method": "ults3.queryShortTermDataValues", "params": [sessionStorage.getItem('sessionId'), object, from, to, offset, limit]
    }).map(res => res.json().result.data);
  }

  public queryLongTermDataValues(object, from, to, offset, limit) {
    return this.http.post(this._serverUrl, {
      "jsonrpc": "2.0", "id": 1, "method": "ults3.queryLongTermDataValues", "params": [sessionStorage.getItem('sessionId'), object, from, to, offset, limit]
    }).map(res => res.json().result.data);
  }

  public queryEvents(from, to, offset, limit, eventObjectFilter, objectTypeFilter, relatedObjectFilter) {
    return this.http.post(this._serverUrl, {
      "jsonrpc": "2.0",
      "id": 1,
      "method": "ults3.queryEvents",
      "params": [sessionStorage.getItem('sessionId'), from, to, offset, limit, eventObjectFilter, objectTypeFilter, relatedObjectFilter]
    }).map(res => res.json().result.data);
  }

  public addEvent(session, object) {
    return this.http.post(this._serverUrl, {
      "jsonrpc": "2.0", "id": 1, "method": "ults3.addEvent", "params": [session, object]
    });
  }

  public getMachineErrors(session) {
    return this.http.post(this._serverUrl, {
      "jsonrpc": "2.0", "id": 1, "method": "ults3.getMachineErrors", "params": [session]
    }).map(res => res.json().result);
  }

  public getAllData(onlyServer) {
    // console.log('get all data call');
    this.objectValuesPromises = [];
    this.objectMetaDataPromises = [];
    const promise: Promise<Map<string, DataObject>> = new Promise((resolve, reject) => {
      if (this.fullDataMap && this.fullDataMap.size > 0 && !onlyServer) {
        resolve(this.fullDataMap);
      } else {
        // console.log('getting data from server...');
        const session = sessionStorage.getItem('sessionId');
        for (const object of this.objects) {
          this.objectValuesPromises.push(this.getObjectValues(session, [object])
            .then(objectValueData => {
                if (objectValueData.success) {
                  const obj = objectValueData.data[0];
                  this.dataMap.set(obj.object, obj.value);
                  // set status
                  if (obj.object === 'ccce92f4-da15-4fe8-8ee6-370d4213892b') {
                    this.globalService.setStatus(obj.value);
                  }
                } else {
                  // console.log(`'${objectValueData.error_description}' while getting object with id ${object}`);
                }
              },
              error => {
                if (error.status === 0) {
                  this.setFullDataMap(new Map());
                  this.globalService.setStatus(0);
                  setTimeout(() => {
                    this.stopTimer();
                    // sessionStorage.removeItem('sessionId');
                    // this.router.navigate(['']);
                  }, 3000);
                }
              }));
        }
        Promise.all(this.objectValuesPromises).then(values => {
          this.dataMap.forEach((value: any, key: string) => {
            this.objectMetaDataPromises.push(this.getObjectMetaData(session, key).then(objectMetaData => {
              const metaData = objectMetaData.data[0];
              if (metaData.datatype === 'Number') {
                if (value && value.toString().includes('.')) {
                  value = value.toString().replace('.', ',');
                }
              }
              this.fullDataMap.set(key, new DataObject(key, value, metaData.writable, metaData.min_value, metaData.max_value, metaData.datatype, metaData.unit));
              // console.log(key, metaData);
            }));
          });
          Promise.all(this.objectMetaDataPromises).then(val => {
            this.setFullDataMap(this.fullDataMap);
            resolve(this.fullDataMap);
          })
        });
      }
    });
    return promise;
  }

  getChartDataWithSubscribe(filterId: string) {
    this.getChartDataSubscription = this.getChartData(filterId).subscribe((data) => {
      if (data) {
        this.setChartData({'filterId': filterId, 'data': data.reverse()});
      }
    });
  };

  getChartData(filterId: string) {
    let from_one;
    if (sessionStorage.getItem(filterId) && sessionStorage.getItem(filterId) === '0') {
      from_one = 0;
    } else {
      from_one = new Date().getTime() / 1000 - 30 * 24 * 60 * 60;
    }
    // console.log('get chart data');
    return this.queryLongTermDataValues(filterId, from_one, new Date().getTime() / 1000, 0, -1);
  };

  getChartListData() {
    // setTimeout(() => {
    this.getChartDataWithSubscribe(this.filter_one_id);
    this.getChartDataWithSubscribe(this.filter_two_id);
    // });
  }

  downloadEvents() {
    this.files.map((fileName) => {
      this.getLocalEventsSubscription = this.getLocalEvents(fileName).subscribe((res) => {
        const file = new File([res], fileName, {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(file, fileName);
        return false;
      }, (err) => {
        console.log(err);
      })
    });
  }

  public replaceAssembly(type: string, name: string, number: string, manufacturingDate: string) {
    return this.http.post(this._serverUrl, {
      "jsonrpc": "2.0", "id": 1, "method": "ults3.replaceAssembly", "params": [sessionStorage.getItem('sessionId'), type, name, number, manufacturingDate]
    }).map(res => res.json());
  }

  public getSession() {
    return sessionStorage.getItem('sessionId');
  }

}
