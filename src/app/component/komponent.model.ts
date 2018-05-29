import { Types } from '../enums/types.enum';
import {Units} from '../enums/units.enums';

export class Komponent {
  public _id: string;
  public _name: string;
  public _description: string;
  public _sortorder: number;
  public _material: string;
  public _typ_1: Types;
  public _typ_2: Types;
  public _typ_3: any;
  public _weight: number;
  public _dimension_X: number;
  public _dimension_Y: number;
  public _dimension_Z: number;
  public _units: Units;
  public _childsElement: Komponent[];



  constructor(id: string, name: string, description: string, typ_1: Types, typ_2: Types, typ_3: any) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._typ_1 = typ_1;
    this._typ_2 = typ_2;
    this._typ_3 = typ_3;
    this._childsElement = [];
  }


}

export interface NewKomponent {
  _name: string;
  _description: string;
  _sortorder: number;
  _material: string;
  _typ_1: string;
  _typ_2: string;
  _typ_3: string;
  _weight: number;
  _dimension_X: number;
  _dimension_Y: number;
  _dimension_Z: number;
  _units: string;
  _childsElement: NewKomponent[];
}
