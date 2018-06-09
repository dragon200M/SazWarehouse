import {Komponent} from '../component/komponent.model';

export class WarehouseModel {
  public _id: string;
  public _name: string;
  public _description: string;
  public _available: boolean;
  public _visibleName: string;

  constructor(id: string, name: string, description: string, available: boolean) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._available = available;
  }

}
export interface Warehouses {
  _name: string;
  _description: string;
  _visibleName: string;
  _available: boolean;
}
