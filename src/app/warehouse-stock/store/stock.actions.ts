import { Action } from '@ngrx/store';
import { StockModel } from '../stock.model';


export const SET_STOCK = 'SET_STOCK';
export const DELETE_STOCK = 'DELETE_STOCK';
export const ADD_STOCK = 'ADD_STOCK';
export const GET_STOCK = 'GET_STOCK';
export const FETCH_STOCK = 'FETCH_STOCK';
export const GET_WAREHOUSE_STOCK = 'GET_WAREHOUSE_STOCK';
export const ADD_STOCK_BY_ONE = 'ADD_STOCK_BY_ONE';
export const CHECK_ADD_START = 'CHECK_ADD_START';
export const CHECK_ADD_STOP = 'CHECK_ADD_STOP';
export const GET_KOMPONENTES_STOCK = 'GET_KOMPONENTES_STOCK';
export const DELETE_WAREHOUSE_STOCK = 'DELETE_WAREHOUSE_STOCK';


export class SetStock implements Action {
  readonly  type = SET_STOCK;
  constructor(public payload: StockModel[]) {}
}

export class AddStock implements Action {
  readonly  type = ADD_STOCK;
  constructor(public payload: StockModel) {}
}

export class GetStock implements Action {
  readonly type = GET_STOCK;
  constructor(public payload: string) {}
}

export class FetchStock implements Action {
  readonly type = FETCH_STOCK;
}
export  class GetStockByWarehouseName implements Action {
  readonly  type = GET_WAREHOUSE_STOCK;
  constructor(public payload: string) {}
}
export class AddStockByOne implements Action {
  readonly type = ADD_STOCK_BY_ONE;
  constructor(public payload: StockModel[]) {}
}

export class AddWarehouseToCheckList implements Action {
  readonly type = CHECK_ADD_START;
  constructor(public payload: string) {}
}

export class RemoveWarehouseFromCheckList implements Action {
  readonly type = CHECK_ADD_STOP;
  constructor(public payload: string) {}
}
export class GetKomponentsStock implements Action {
  readonly type = GET_KOMPONENTES_STOCK;
}

export class DeleteStock implements Action {
  readonly type = DELETE_STOCK;
  constructor(public payload: {warehouse: string, komponent: string}) {}
}

export class DeleteStockByName implements Action {
  readonly type = DELETE_WAREHOUSE_STOCK;
  constructor(public payload: string[] ) {}
}


export type StockActions = SetStock|AddStock|GetStock|FetchStock|
  GetStockByWarehouseName
  |AddStockByOne
  |AddWarehouseToCheckList
  |RemoveWarehouseFromCheckList
  |GetKomponentsStock
  |DeleteStock
  |DeleteStockByName;

