import { Komponent } from '../komponent.model';
import {Types} from '../../enums/types.enum';
import * as KomponentActions from './komp.actions';
import * as fromApp from  '../../store/app.reducers';


export interface FeatureState extends fromApp.AppState {
  komponents: State;
}

export interface State {
  komponents: Komponent[];
  errors: boolean;
}
export interface State2 {
  komponents: Komponent[];
}

const initialState: State = {
  komponents: [],
  errors: false
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
    case (KomponentActions.ERROR):
      return {
        ...state,
        errors: action.payload
      };
    case (KomponentActions.UPDATE_KOMPONENT):

      const komp = state.komponents[action.payload.index];
      const update = {
        ...komp,
        ...action.payload.updatedKompo
      };
      const komponents = [...state.komponents];
      komponents[action.payload.index] = update;
      return {
        ...state,
        komponents: komponents
      };
    default:
      return state;
  }

}
