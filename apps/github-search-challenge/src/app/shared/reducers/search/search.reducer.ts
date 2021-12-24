import { AnyAction, Reducer } from 'redux';
import { PaginationInterface } from '../../interfaces/pagination.interface';
import { UserInterface } from '../../interfaces/user.interface';
import { SearchUsersQueryParamsInterface } from '../../services/users.service';
import {
  ADD_COMPANIES_ACTION_SEARCH_TYPE,
  ADD_USERS_ACTION_SEARCH_TYPE,
  SET_COMPANIES_ACTION_SEARCH_TYPE,
  SET_COMPANY_REQUEST_ACTION_SEARCH_TYPE,
  SET_LOADING_ACTION_SEARCH_TYPE,
  SET_USERS_ACTION_SEARCH_TYPE,
  SET_USER_REQUEST_ACTION_SEARCH_TYPE,
} from './actions';

export const searchReducer: Reducer = (
  state: SearchStateInterface = initialSearchState,
  action: AnyAction
): SearchStateInterface => {
  switch (action.type) {
    case SET_USER_REQUEST_ACTION_SEARCH_TYPE:
      return { ...state, userRequest: action.payload };
    case SET_COMPANY_REQUEST_ACTION_SEARCH_TYPE:
      return { ...state, companyRequest: action.payload };
    case SET_COMPANIES_ACTION_SEARCH_TYPE:
      return { ...state, companies: action.payload };
    case SET_USERS_ACTION_SEARCH_TYPE:
      return { ...state, users: action.payload };
    case ADD_USERS_ACTION_SEARCH_TYPE:
      return {
        ...state,
        users: {
          ...state.users,
          items: [
            ...(state.users?.items || []),
            ...(action.payload?.items || []),
          ],
        },
      };
    case ADD_COMPANIES_ACTION_SEARCH_TYPE:
      return {
        ...state,
        companies: {
          ...state.companies,
          items: [
            ...(state.companies?.items || []),
            ...(action.payload?.items || []),
          ],
        },
      };
    case SET_LOADING_ACTION_SEARCH_TYPE:
      return { ...state, loading: action.payload };
  }
  return state;
};

export interface SearchStateInterface {
  userRequest: SearchUsersQueryParamsInterface;
  companyRequest: SearchUsersQueryParamsInterface;
  users: PaginationInterface<UserInterface>;
  companies: PaginationInterface<UserInterface>;
  loading: boolean;
}

export const initialSearchState: SearchStateInterface = {
  userRequest: null as unknown as SearchUsersQueryParamsInterface,
  companyRequest: null as unknown as SearchUsersQueryParamsInterface,
  users: null as unknown as PaginationInterface<UserInterface>,
  companies: null as unknown as PaginationInterface<UserInterface>,
  loading: false,
};
