import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as WarehouseActions from './warehouse.actions';
import * as fromWarehouse from './warehouse.reducers';
import { WarehouseModel, Warehouses } from '../warehouse.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import {ApiService} from '../../services/api.service';




@Injectable()
export class WarehouseEffects {
  public  warehousesTmp: Warehouses[];

  @Effect()
  getWarehouseStockItem = this.action$
    .ofType(WarehouseActions.FETCH_WAREHOUSE)
    .switchMap((action: WarehouseActions.FetchWarehouses) => {
      return this.apiService.getWarehouses();
    })
    .map(
      (war) => {
        const tmp = [];
        console.log('Load  warehouses');
        for (const e of war) {
          const w = new WarehouseModel(e._name, e._name, e._description, e._available);
          w.visibleName = e._visibleName;
          tmp.push(w);
        }

        return {
          type: WarehouseActions.SET_WAREHOUSE,
          payload: tmp
        };
      }
    );

  @Effect()
  addWarehouse = this.action$
    .ofType(WarehouseActions.STORE_WAREHOUSE)
    .switchMap((action: WarehouseActions.StoreWarehouses) => {
         return this.apiService.saveWarehouse(action.payload);
    }).map((war) => {

      if (war.hasOwnProperty('error')) {
        return {
          type: WarehouseActions.ERROR,
          payload: true
        };
      } else {

        const w = new WarehouseModel(war._name, war._name, war._description, war._available);
        w.visibleName = war._visibleName;

        return {
          type: WarehouseActions.ADD_WAREHOUSE,
          payload: w
        };
      }
    });


  constructor(private action$: Actions,
              private store: Store<fromWarehouse.FeatureState>,
              private apiService: ApiService) { }
}


