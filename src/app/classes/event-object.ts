export class EventObject {
  private _object: string;
  private _related: string;
  private _timestamp: number;

  constructor(object: string, related: string, timestamp: number) {
    this._object = object;
    this._related = related;
    this._timestamp = timestamp;
  }

  get object(): string {
    return this._object;
  }

  set object(value: string) {
    this._object = value;
  }

  get related(): string {
    return this._related;
  }

  set related(value: string) {
    this._related = value;
  }

  get timestamp(): number {
    return this._timestamp;
  }

  set timestamp(value: number) {
    this._timestamp = value;
  }
}
