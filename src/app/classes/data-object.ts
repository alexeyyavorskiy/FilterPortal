export class DataObject {

  private _id: string;
  private _value: any;
  private _writable: boolean;
  private _max_value: number;
  private _min_value: number;
  private _data_type: string;
  private _unit: string;
  private _fake: boolean;

  constructor(id: string, value: any, writable: boolean, min_value: number, max_value: number, data_type: string, unit: string, fake?: boolean) {
    this._id = id;
    this._value = value;
    this._writable = writable;
    this._min_value = min_value;
    this._max_value = max_value;
    this._data_type = data_type;
    this._unit = unit;
    this._fake = fake;
  }

  get id(): string {
    return this._id;
  }

  get value(): any {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
  }

  get writable(): boolean {
    return this._writable;
  }

  get max_value(): number {
    return this._max_value;
  }

  get min_value(): number {
    return this._min_value;
  }

  get data_type(): string {
    return this._data_type;
  }

  get unit(): string {
    return this._unit;
  }

  get fake(): boolean {
    return this._fake;
  }

  set fake(value: boolean) {
    this._fake = value;
  }
}
