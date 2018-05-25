import {WarehouseModel} from '../warehouse/warehouse.model';
import {Komponent} from '../component/komponent.model';

export class StockModel {
 public _id: _id;
 public  warehouse: WarehouseModel;
 public  component: Komponent;
 public _stock: number;


  constructor(id: _id, warehouse: WarehouseModel, komponent: Komponent, stock: number) {
    this._id = id;
    this.warehouse = warehouse;
    this.component = komponent;
    this._stock = stock;
  }

}


interface _id {
  _kName: string;
  _wName: string;
}

