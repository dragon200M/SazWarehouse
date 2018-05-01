import {Komponent} from '../component/komponent.model';

export class WarehouseModel {
  public id: string;
  public name: string;
  public description: string;
  public available: boolean;
  public visibleName: string;

  constructor(id: string, name: string, description: string, available: boolean) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.available = available;
    this.visibleName = this.name;
  }

}
