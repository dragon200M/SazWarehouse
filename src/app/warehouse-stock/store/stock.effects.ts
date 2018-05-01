import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as StockActions from './stock.actions';
import * as fromStock from './stock.reducers';
import {StockModel} from '../stock.model';
import {Types} from '../../enums/types.enum';
import {WarehouseModel} from '../../warehouse/warehouse.model';
import {Komponent} from '../../component/komponent.model';
import 'rxjs/add/operator/map';

@Injectable()
export class MainEffects {
   tmp =  [new StockModel('st1', new WarehouseModel('testMagazyn', 'Magazyn_1', '', true),
    new Komponent('3', 'abc22', 'aa', Types.sztuka, Types.pusty, ''), 11500)
    ,
    new StockModel('st2', new WarehouseModel('a2', 'Magazyn_2', '', true),
      new Komponent('3', 'komp1', 'aa', Types.sztuka, Types.pusty, ''), 5100)

    , new StockModel('st2', new WarehouseModel('a2', 'Magazyn_2', '', true),
      new Komponent('3', 'Komp2', 'aa', Types.sztuka, Types.pusty, ''), 99)
    , new StockModel('st1', new WarehouseModel('testMagazyn', 'Magazyn_3', '', true),
      new Komponent('3', 'abc22', 'aa', Types.sztuka, Types.pusty, ''), 500)
    ,
    new StockModel('st2', new WarehouseModel('a2', 'Magazyn_3', '', true),
      new Komponent('3', 'komp1', 'aa', Types.sztuka, Types.pusty, ''), 5100)
    , new StockModel('st2', new WarehouseModel('a2', 'Magazyn_3', '', true),
      new Komponent('3', 'Komp2', 'aa', Types.sztuka, Types.pusty, ''), 99)
  ];


  @Effect()
  getWarehouseStockItem = this.action$
    .ofType(StockActions.FETCH_STOCK)
    .map((action: StockActions.FetchStock) => {
      const a = this.tmp;
      return {
        type: StockActions.SET_STOCK,
        payload: a
      };
    });
  @Effect()
  getStockItemByWarehouseName = this.action$.ofType(
    StockActions.GET_WAREHOUSE_STOCK)
    .map((action: StockActions.GetStockByWarehouseName) => {
      const t = this.tmp.filter(a => a.warehouse.name === action.payload);
      return {
        type: StockActions.ADD_STOCK_BY_ONE,
        payload: t
      };
    });


  //TODO pobieranie nazw magazynow dla komponentu

  constructor(private action$: Actions,
              private store: Store<fromStock.FeatureState>) { }
}
