import { DataObject } from "./data-object";

export class ParameterListBlockObject {

  private _name: string;
  private _objects: DataObject[];


  constructor(name: string, objects: DataObject[]) {
    this._name = name;
    this._objects = objects;
  }

  get name(): string {
    return this._name;
  }

  get objects(): DataObject[] {
    return this._objects;
  }
}
