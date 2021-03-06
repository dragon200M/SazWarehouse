import { WarehouseModel } from '../warehouse.model';
import * as WarehouseActions from './warehouse.actions';
import * as fromApp from '../../store/app.reducers';



export interface FeatureState extends fromApp.AppState {
  warehouses: State;
}

export interface State {
  warehouses: WarehouseModel[];
  errors: boolean;
}


const initialState: State = {
  warehouses: [],
  errors: false
};

export function warehouseReducer(state = initialState, action: WarehouseActions.WarehouseActions) {
  switch (action.type) {
    case (WarehouseActions.SET_WAREHOUSE):
      return {
        ...state,
        warehouses: [...action.payload],
        errors: false
      };
    case (WarehouseActions.GET_WAREHOUSE):
      const warehouse = state.warehouses.filter(
        w => w._name === action.payload);
      return {
        ...state,
        warehouses: warehouse,
        errors: false
      };
    case (WarehouseActions.ADD_WAREHOUSE):
      return {
        ...state,
        warehouses: [...state.warehouses, action.payload],
        errors: false
      };
    case (WarehouseActions.UPDATE_WAREHOUSE):
      const warehouses = [...state.warehouses];
      const warInd = warehouses.findIndex(w => w._name === action.payload.name);
      warehouses[warInd] = action.payload.updated;

      return {
        ...state,
        warehouses: warehouses
      };
    case (WarehouseActions.ERROR):
      return {
        ...state,
        errors: true
      };
    default:
      return state;
  }

}
