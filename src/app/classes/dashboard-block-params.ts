export class DashboardBlockParams {

  private _value: number;
  private _name: string;
  private _buttonGroup: boolean;
  private _showHeader: boolean;
  private _dynamicColor: boolean;
  private _replaceId: string;
  private _filterId: string;

  constructor(value: number, name: string, buttonGroup: boolean, showHeader: boolean, dynamicColor: boolean, replaceId?: string, filterId?: string) {
    this._value = value;
    this._name = name;
    this._buttonGroup = buttonGroup;
    this._showHeader = showHeader;
    this._dynamicColor = dynamicColor;
    this._replaceId = replaceId;
    this._filterId = filterId;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get buttonGroup(): boolean {
    return this._buttonGroup;
  }

  set buttonGroup(value: boolean) {
    this._buttonGroup = value;
  }

  get showHeader(): boolean {
    return this._showHeader;
  }

  set showHeader(value: boolean) {
    this._showHeader = value;
  }

  get dynamicColor(): boolean {
    return this._dynamicColor;
  }

  set dynamicColor(value: boolean) {
    this._dynamicColor = value;
  }

  get replaceId(): string {
    return this._replaceId;
  }

  set replaceId(value: string) {
    this._replaceId = value;
  }

  get filterId(): string {
    return this._filterId;
  }

  set filterId(value: string) {
    this._filterId = value;
  }
}
