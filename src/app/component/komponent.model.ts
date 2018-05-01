import { Types } from '../enums/types.enum';
import {Units} from '../enums/units.enums';

export class Komponent {
  private _id: string;
  private _name: string;
  private _description: string;
  private _typ_1: Types;
  private _typ_2: Types;
  private _typ_3: any;
  private _weight: number;
  private _units: Units;
  private _childsElement: Komponent[];



  constructor(id: string, name: string, description: string, typ_1: Types, typ_2: Types, typ_3: any) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._typ_1 = typ_1;
    this._typ_2 = typ_2;
    this._typ_3 = typ_3;
    this._childsElement = [];
  }


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get typ_1(): Types {
    return this._typ_1;
  }

  set typ_1(value: Types) {
    this._typ_1 = value;
  }

  get typ_2(): Types {
    return this._typ_2;
  }

  set typ_2(value: Types) {
    this._typ_2 = value;
  }

  get typ_3(): any {
    return this._typ_3;
  }

  set typ_3(value: any) {
    this._typ_3 = value;
  }

  get childsElement(): Komponent[] {
    return this._childsElement;
  }

  set childsElement(value: Komponent[]) {
    this._childsElement = value;
  }

  get weight(): number {
    return this._weight;
  }

  set weight(value: number) {
    this._weight = value;
  }


  get units(): Units {
    return this._units;
  }

  set units(value: Units) {
    this._units = value;
  }
}
