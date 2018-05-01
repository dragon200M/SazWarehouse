import { Action } from '@ngrx/store';
import { Komponent} from '../komponent.model';

export const SET_KOMPONENT = 'SET_KOMPONENT';
export const ADD_KOMPONENT = 'ADD_KOMPONENT';
export const UPDATE_KOMPONENT = 'UPDATE_KOMPONENT';
export const DELETE_KOMPONENT = 'DELETE_KOMPONENT';
export const STORE_KOMPONENT = 'STORE_KOMPONENT';
export const FETCH_KOMPONENT = 'FETCH_KOMPONENT';

export class SetKomponents implements Action {
  readonly type = SET_KOMPONENT;
  constructor(public payload: Komponent[]) {}
}

export class AddKomponent implements Action {
  readonly type = ADD_KOMPONENT;
  constructor(public payload: Komponent) {}
}

export class UpdateKomponent implements Action {
  readonly type = UPDATE_KOMPONENT;
  constructor(public payload: {index: number, updatedKompo: Komponent}) {}
}

export class DeleteKomponent implements Action {
  readonly type = DELETE_KOMPONENT;
  constructor(public payload: number) {}
}

export class StoreKomponent implements Action {
  readonly type = STORE_KOMPONENT;
}

export class FetchKomponent implements Action {
  readonly type = FETCH_KOMPONENT;

}

export type KomponentActions =
  SetKomponents   |
  AddKomponent    |
  UpdateKomponent |
  DeleteKomponent |
  StoreKomponent  |
  FetchKomponent ;


