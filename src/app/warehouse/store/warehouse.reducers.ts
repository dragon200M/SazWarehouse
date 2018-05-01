import { WarehouseModel } from '../warehouse.model';
import * as WarehouseActions from './warehouse.actions';
import * as fromApp from '../../store/app.reducers';



export interface FeatureState extends fromApp.AppState {
  warehouses: State;
}

export interface State {
  warehouses: WarehouseModel[];
}


const initialState: State = {
  warehouses: []
};

export function warehouseReducer(state = initialState, action: WarehouseActions.WarehouseActions) {
  switch (action.type) {
    case (WarehouseActions.SET_WAREHOUSE):
      return {
        ...state,
        warehouses: [...action.payload]
      };
    case (WarehouseActions.GET_WAREHOUSE):
      const warehouse = state.warehouses.filter(
        w => w.name === action.payload);
      return {
        ...state,
        warehouses: warehouse
      };
    case (WarehouseActions.ADD_WAREHOUSE):
      return {
        ...state,
        warehouses: [...state.warehouses, action.payload]
      };
    default:
      return state;
  }

}
