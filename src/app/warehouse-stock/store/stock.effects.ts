import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as StockActions from './stock.actions';
import * as fromStock from './stock.reducers';
import {StockModel} from '../stock.model';
import {Types} from '../../enums/types.enum';
import {WarehouseModel} from '../../warehouse/warehouse.model';
import {Komponent} from '../../component/komponent.model';
import 'rxjs/add/operator/map';
import {ApiService} from '../../services/api.service';


@Injectable()
export class MainEffects {


  @Effect()
  getWarehouseStockItem = this.action$
    .ofType(StockActions.FETCH_STOCK)
    .switchMap((action: StockActions.FetchStock) =>{
      return this.api.getStockAllV2();
    }).
    map((war) => {
      return {
        type: StockActions.SET_STOCK,
        payload: war
      };
    });
  @Effect()
  getStockItemByWarehouseName = this.action$
    .ofType(StockActions.GET_WAREHOUSE_STOCK)
    .switchMap((action: StockActions.GetStockByWarehouseName) => {
      return this.api.getStockAll(action.payload);
    })
    .map((war) => {
      console.log(war);
      return {
        type: StockActions.ADD_STOCK_BY_ONE,
        payload: war
      };
    });


  //TODO pobieranie nazw magazynow dla komponentu

  constructor(private action$: Actions,
              private store: Store<fromStock.FeatureState>,
              private api: ApiService) { }
}
