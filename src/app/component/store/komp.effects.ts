import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as fromComponents from './komp.reducers';
import * as componentsActions from './komp.actions';
import {ApiService} from '../../services/api.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap'
import {Komponent} from '../komponent.model';
import {Store} from '@ngrx/store';

@Injectable()
export class ComponentsEffects {

@Effect()
getComponents = this.action$
    .ofType(componentsActions.FETCH_KOMPONENT)
    .switchMap((action: componentsActions.FetchKomponent) => {
      return this.apiService.getComponents();
    })
  .map( (war) => {
    return {
      type: componentsActions.SET_KOMPONENT,
      payload: war
    };
  });

@Effect()
addComponent = this.action$
  .ofType(componentsActions.STORE_KOMPONENT)
  .switchMap((action: componentsActions.StoreKomponent) => {
    return this.apiService.saveComponent(action.payload);
  }).map((kom) => {
    if (kom.hasOwnProperty('error')) {

      return {
        type: componentsActions.ERROR,
        payload: true
      };
    } else {
      const k = new Komponent(kom._name, kom._name, kom._description, kom._typ_1, kom._typ_2, kom._typ_3);
      k._weight = kom._weight; k._units = kom._units; k._material = kom._material;
      k._sortorder = kom._sortorder; k._dimension_X = kom._dimension_X;
      k._dimension_Y = kom._dimension_Y; k._dimension_Z = kom._dimension_Z;
       this.store.dispatch(new componentsActions.ErrorKomponent(false));
      return {
        type: componentsActions.ADD_KOMPONENT,
        payload: k
      };
    }
  });


  @Effect()
  updateComponent = this.action$
    .ofType(componentsActions.UPDATE_KOMPONENT)
    .switchMap((action: componentsActions.UpdateKomponent) => {

      return this.apiService.updateComponent(action.payload.updatedKompo, action.payload.name);
    }).map((kom) => {
      if (kom.hasOwnProperty('error')) {
        return {
          type: componentsActions.ERROR,
          payload: true
        };
      } else {
        const k = new Komponent(kom._name, kom._name, kom._description, kom._typ_1, kom._typ_2, kom._typ_3);
        k._weight = kom._weight; k._units = kom._units; k._material = kom._material;
        k._sortorder = kom._sortorder; k._dimension_X = kom._dimension_X;
        k._dimension_Y = kom._dimension_Y; k._dimension_Z = kom._dimension_Z;

        return {
          type: componentsActions.ERROR,
          payload: false
        };
      }

    });


  constructor(private action$: Actions,
              private apiService: ApiService,
              private store: Store<fromComponents.FeatureState>) {}
}
