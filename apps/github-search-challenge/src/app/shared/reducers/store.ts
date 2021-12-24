import {
  applyMiddleware,
  combineReducers,
  createStore,
  Reducer,
  Store,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import * as SearchReducer from './search/search.reducer';

export const appReducer: Reducer<AppState> = combineReducers({
  search: SearchReducer.searchReducer,
});

export const getStore = (
  defaultState: AppState = initialState
): Store => {
  return createStore(
    appReducer,
    defaultState,
    composeWithDevTools(applyMiddleware(thunk))
  );
};

export interface AppState {
  search: SearchReducer.SearchStateInterface;
}

export const initialState: AppState = {
  search: SearchReducer.initialSearchState,
};
