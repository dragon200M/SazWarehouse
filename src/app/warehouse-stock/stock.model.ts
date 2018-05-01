import {WarehouseModel} from '../warehouse/warehouse.model';
import {Komponent} from '../component/komponent.model';

export class StockModel {
 private _id: string;
 private _warehouse: WarehouseModel;
 private _komponent: Komponent;
 private _stock: number;


  constructor(id: string, warehouse: WarehouseModel, komponent: Komponent, stock: number) {
    this._id = id;
    this._warehouse = warehouse;
    this._komponent = komponent;
    this._stock = stock;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get warehouse(): WarehouseModel {
    return this._warehouse;
  }

  set warehouse(value: WarehouseModel) {
    this._warehouse = value;
  }

  get komponent(): Komponent {
    return this._komponent;
  }

  set komponent(value: Komponent) {
    this._komponent = value;
  }

  get stock(): number {
    return this._stock;
  }

  set stock(value: number) {
    this._stock = value;
  }
}
