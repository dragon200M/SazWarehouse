import { Action } from '@ngrx/store';
import { WarehouseModel } from '../warehouse.model';


export const SET_WAREHOUSE = 'SET_WAREHOUSE';
export const ADD_WAREHOUSE = 'ADD_WAREHOUSE';
export const UPDATE_WAREHOUSE = 'UPDATE_WAREHOUSE';
export const DELETE_WAREHOUSE = 'DELETE_WAREHOUSE';
export const STORE_WAREHOUSE = 'STORE_WAREHOUSE';
export const FETCH_WAREHOUSE = 'FETCH_WAREHOUSE';
export const GET_WAREHOUSE = 'GET_WAREHOUSE';
export const ERROR = 'ERROR';

export class SetWarehouse implements Action {
  readonly  type = SET_WAREHOUSE;
  constructor(public payload: WarehouseModel[]) {}
}


export class AddWarehouse implements Action {
  readonly  type = ADD_WAREHOUSE;
  constructor(public payload: WarehouseModel) {}
}

export class UpdateWarehouse implements Action {
  readonly  type = UPDATE_WAREHOUSE;
  constructor(public payload:{name: string, updated: WarehouseModel }) {}
}


export class GetWarehouse implements Action {
  readonly type = GET_WAREHOUSE;
  constructor(public payload: string) {}
}
export class FetchWarehouses implements Action {
  readonly type = FETCH_WAREHOUSE;
}
export class StoreWarehouses implements Action {
  readonly type = STORE_WAREHOUSE;
  constructor(public payload: WarehouseModel) {}
}
export class ErrorWarehouses implements Action {
  readonly type = ERROR;
  constructor(public payload: boolean) {}
}

export type WarehouseActions = SetWarehouse
  |AddWarehouse
  |GetWarehouse
  |FetchWarehouses
  |StoreWarehouses
  |ErrorWarehouses
  |UpdateWarehouse;

