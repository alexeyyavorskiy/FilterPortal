export class DashboardBlockEvent {

  private _id: string;
  private _editMode: boolean;

  constructor(id: string, editMode: boolean) {
    this._id = id;
    this._editMode = editMode;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get editMode(): boolean {
    return this._editMode;
  }

  set editMode(value: boolean) {
    this._editMode = value;
  }
}
