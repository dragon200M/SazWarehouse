import { ActionReducerMap } from '@ngrx/store';

import * as fromKomponentList from '../component/store/komp.reducers';
import * as fromWarehousesList from '../warehouse/store/warehouse.reducers';
import * as fromStockList from '../warehouse-stock/store/stock.reducers';

export interface AppState {
  komponentList: fromKomponentList.State,
  kompList: fromKomponentList.State,
  warehouseList: fromWarehousesList.State,
  warehouseStockList: fromStockList.State
}

export const reducers: ActionReducerMap<AppState> = {
  komponentList: fromKomponentList.komponentReducer,
  kompList: fromKomponentList.komponentReducer,
  warehouseList: fromWarehousesList.warehouseReducer,
  warehouseStockList: fromStockList.stockReducer
};
