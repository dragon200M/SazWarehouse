import {UserRole} from '../enums/roles.enum';

export class UserModel {
  private _id: string;
  private _name: string;
  private _surname: string;
  private _role: UserRole;

//http://brianflove.com/2017/04/10/angular-reactive-authentication/
  constructor(id: string, name: string, surname: string, role: UserRole) {
    this._id = id;
    this._name = name;
    this._surname = surname;
    this._role = role;
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

  get surname(): string {
    return this._surname;
  }

  set surname(value: string) {
    this._surname = value;
  }

  get role(): UserRole {
    return this._role;
  }

  set role(value: UserRole) {
    this._role = value;
  }
}
