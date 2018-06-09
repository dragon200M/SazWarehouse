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
    case (StockActions.DELETE_STOCK):
      const stocksArr = [...state.warehouseStock];
      const stockInd = stocksArr.findIndex(
        st => st._id._wName === action.payload.warehouse &&
                 st._id._kName === action.payload.komponent);
      if (stockInd > -1) {
        console.log(stocksArr[stockInd]);
        stocksArr.splice(stockInd, 1);
      }
      return {
        ...state,
        warehouseStock: stocksArr
      };
    case (StockActions.DELETE_WAREHOUSE_STOCK):
      const stocksArr1 = [...state.warehouseStock];
      const tmpStock = stocksArr1.filter(stEle => !action.payload.includes(stEle._id._wName));


      return {
        ...state,
        warehouseStock: tmpStock
      };
    case (StockActions.ADD_STOCK):
      const tmp = state.warehouseStock;
      const pay = action.payload;
      const s = tmp.filter(f => f.warehouse._name === pay.warehouse._name
        && f.component._name === pay.component._name );
      let a1: StockModel[];
      if (s.length > 0) {

       const i = tmp.findIndex(b => b.warehouse._name === s[0].warehouse._name &&
         b.component._name === s[0].component._name);
       s[0]._stock += action.payload._stock;
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
        a => a.warehouse._name === action.payload);
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
      const tmp1 = {material: '', magazyn: '', ilosc: 0};
      const tmp2 = [];
      if (warStock1.length > 0) {
        // for (let s of warStock1) {
        //   const k1 = s.komponent.name;
        //   const w1 = s.warehouse.name;
        //   const st = s.stock;
        //   tmp1.material = k1;
        //   tmp1.magazyn = w1;
        //   tmp1.ilosc = st;
        //
        //   const szukane = tmp2.filter(s1 => s1.material
        //     === tmp1.material &&
        //     s1.magazyn === tmp1.magazyn);
        //
        //   if (szukane.length > 0) {
        //     const ind3 = tmp2.findIndex(s1 => s1.material
        //       === tmp1.material &&
        //       s1.magazyn === tmp1.magazyn);
        //     tmp2[ind3].ilosc += tmp1.ilosc;
        //   } else {
        //     tmp2.push(tmp1);
        //
        //   }
        //
        // }

      }
      console.log(state.komponentsSumUp);
      return {
        ...state,
        komponentsSumUp: [...state.komponentsSumUp, ...tmp2]
      };
      default:
      return state;
  }

}
