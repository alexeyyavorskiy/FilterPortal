import {
  EventEmitter,
  Injectable
} from '@angular/core';

@Injectable()
export class EmitterService {
  private _emitters: { [ID: string]: EventEmitter<any> } = {};

  constructor() {
  }
  public get(ID: string): EventEmitter<any> {
    if (!this._emitters[ID]) {
      this._emitters[ID] = new EventEmitter();
    }
    return this._emitters[ID];
  }

}
