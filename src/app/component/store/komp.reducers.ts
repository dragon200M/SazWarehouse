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
      console.log(action.payload);
      return {
        ...state,
        errors: action.payload
      };
    case (KomponentActions.UPDATE_KOMPONENT):
      console.log('update komponent');
      const komponents = [...state.komponents];
      const komp = komponents.findIndex(w => w._name === action.payload.name);
      komponents[komp] = action.payload.updatedKompo;
      komponents[komp]._childsElement = action.payload.updatedKompo._childsElement;

      return {
        ...state,
        komponents: komponents
      };
    case (KomponentActions.UPDATE_ONE_KOMPONENT):
      console.log('Komponent update one');
      const komponents1 = [...state.komponents];
      const komp1 = komponents1.findIndex(w => w._name === action.payload.name);


      komponents1[komp1] = action.payload.updatedKompo;
      komponents1[komp1]._childsElement = action.payload.updatedKompo._childsElement;
      console.log(komponents1[komp1]);

      return {
        ...state,
        komponents: komponents1
      };
    default:
      return state;

  }

}
