import { StockModel } from '../stock.model';
import * as StockActions from './stock.actions';
import * as fromApp from '../../store/app.reducers';
import {Types} from '../../enums/types.enum';
import {Komponent} from '../../component/komponent.model';
import {WarehouseModel} from '../../warehouse/warehouse.model';
import {komponentReducer} from '../../component/store/komp.reducers';



export interface FeatureState extends fromApp.AppState {
  warehouseStock: State;

}

export interface State {
  warehouseStock: StockModel[];
  downaloadedStock: string[];
  komponentsSumUp: {komponent: '', warehouse: '', stock: 0}[];
}


const initialState: State = {
  warehouseStock: [],
  downaloadedStock: [],
  komponentsSumUp: []
};

export function stockReducer(state = initialState, action: StockActions.StockActions) {
  switch (action.type) {
    case (StockActions.SET_STOCK):
      return {
        ...state,
        warehouseStock: [...action.payload]
      };
    case (StockActions.ADD_STOCK):
      const tmp = state.warehouseStock;
      const pay = action.payload;
      const s = tmp.filter(f => f.warehouse.name === pay.warehouse.name
        && f.komponent.name === pay.komponent.name );
      let a1: StockModel[];
      if (s.length > 0) {
       const i = tmp.findIndex(b => b.warehouse.name === s[0].warehouse.name &&
        b.komponent.name === s[0].komponent.name);
       s[0].stock += action.payload.stock;
       tmp[i] = s[0];
       a1 = tmp;

      } else {
        a1 = [...tmp, pay];
      }
      return {
        ...state,
        warehouseStock: [...a1]
      };
    case (StockActions.GET_STOCK):
      const stock = state.warehouseStock.filter(
        a => a.warehouse.name === action.payload);
      return {
        ...state,
        warehouseStock: stock
      };
    case (StockActions.ADD_STOCK_BY_ONE):

      return {
        ...state,
        warehouseStock: [...state.warehouseStock, ...action.payload]
      };
    case (StockActions.CHECK_ADD_START):
      const old1 = [...state.downaloadedStock];
      const exists =  old1.indexOf(action.payload);
      let newState = [];
      if (exists !== -1) {
         newState =  [...state.downaloadedStock];
      } else {
        newState =  [...state.downaloadedStock, action.payload];
      }
      return {
        ...state,
        downaloadedStock: newState
      };
    case (StockActions.CHECK_ADD_STOP):
      const old = [...state.downaloadedStock];
      const ind = old.findIndex(b => b === action.payload);
      old.splice(ind, 1);
      return {
        ...state,
        downaloadedStock: [...old]
      };
    case (StockActions.GET_KOMPONENTES_STOCK):
     //TODO naprawic sumowanie wedlug magazynu i komponentow
      const warStock1 = state.warehouseStock;
      let tmp1 = {material: '', magazyn: '', ilosc: 0};
      let tmp2 = [];
      if(warStock1.length > 0) {
        for (let s of warStock1) {
          const k1 = s.komponent.name;
          const w1 = s.warehouse.name;
          const st = s.stock;
          tmp1.material = k1;
          tmp1.magazyn = w1;
          tmp1.ilosc = st;

          const szukane = tmp2.filter(s1 => s1.material
            === tmp1.material &&
            s1.magazyn === tmp1.magazyn);

          if (szukane.length > 0) {
            const ind3 = tmp2.findIndex(s1 => s1.material
              === tmp1.material &&
              s1.magazyn === tmp1.magazyn);
            tmp2[ind3].ilosc += tmp1.ilosc;
          } else {
            tmp2.push(tmp1);

          }

        }

      }
      console.log(state.komponentsSumUp);
      return {
        ...state,
        komponentsSumUp:[...state.komponentsSumUp,...tmp2]
      };
      default:
      return state;
  }

}
