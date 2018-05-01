import { Komponent } from '../komponent.model';
import {Types} from '../../enums/types.enum';
import * as KomponentActions from './komp.actions';
import * as fromApp from  '../../store/app.reducers';


export interface FeatureState extends fromApp.AppState {
  komponents: State;
}

export interface State {
  komponents: Komponent[];
}
export interface State2 {
  komponents: Komponent[];
}

const initialState: State = {
  komponents: [new Komponent('1', 'abc1', 'aa', Types.sztuka, Types.pusty, ''),
    new Komponent('2', 'abc2', 'aa', Types.sztuka, Types.pusty, ''),
    new Komponent('2', 'abc22', 'aa', Types.sztuka, Types.pusty, '')],
};

export function komponentReducer(state = initialState, action: KomponentActions.KomponentActions) {
  switch (action.type) {
    case (KomponentActions.SET_KOMPONENT):
      return {
        ...state,
        komponents: [...action.payload]
      };
    case (KomponentActions.ADD_KOMPONENT):
      return {
        ...state,
        komponents: [...state.komponents, action.payload]
      };
    default:
      return state;
  }

}
