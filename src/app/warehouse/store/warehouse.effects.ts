import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as WarehouseActions from './warehouse.actions';
import * as fromWarehouse from './warehouse.reducers';
import { WarehouseModel } from '../warehouse.model';
import 'rxjs/add/operator/map';

@Injectable()
export class WarehouseEffects {

  @Effect()
  getWarehouseStockItem = this.action$
    .ofType(WarehouseActions.FETCH_WAREHOUSE)
    .map((action: WarehouseActions.FetchWarehouses) => {
      const tmp: WarehouseModel[] = [
        new WarehouseModel('testMagazyn', 'Magazyn_1', 'Mosy',true),
        new WarehouseModel('a2', 'Magazyn_2', 'Malarnia',true),
        new WarehouseModel('a3', 'Magazyn_3', 'Hala 1',false),
        new WarehouseModel('a4', 'Magazyn_5', 'Hala 2',true)
      ];

      return {
        type: WarehouseActions.SET_WAREHOUSE,
        payload: tmp
      };

    });

  constructor(private action$: Actions,
              private store: Store<fromWarehouse.FeatureState>) { }
}
