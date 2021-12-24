import { Dispatch } from 'redux';
import {
  searchUsers,
  SearchUsersQueryParamsInterface,
} from '../../services/users.service';
import { showErrorMessage } from '../../utils/errors';
import { AppState } from '../store';

export const SET_USER_REQUEST_ACTION_SEARCH_TYPE = '@search/setUserRequest';
export const SET_COMPANY_REQUEST_ACTION_SEARCH_TYPE = '@search/setCompanyRequest';
export const SET_USERS_ACTION_SEARCH_TYPE = '@search/setUsers';
export const ADD_USERS_ACTION_SEARCH_TYPE = '@search/addUsers';
export const SET_COMPANIES_ACTION_SEARCH_TYPE = '@search/setCompanies';
export const ADD_COMPANIES_ACTION_SEARCH_TYPE = '@search/addCompanies';
export const SET_LOADING_ACTION_SEARCH_TYPE = '@search/setLoading';

// Async
export const searchAction: (query: string) => void = (query: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (dispatch: Dispatch<any>, getState: () => AppState) => {
    if (!query) {
      return dispatch(setNullAllValues());
    }
    
    const { users, companies, userRequest, companyRequest } = getState().search;

    if (userRequest?.q !== query || users?.items?.length < users.total_count) {
      dispatch(setUsers(query));
    }

    if (companyRequest?.q !== query || companies?.items?.length < companies.total_count) {
      dispatch(setCompanies(query));
    }
  };
};

export const moreUsers: () => void = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (dispatch: Dispatch<any>, getState: () => AppState) => {
    const { users, userRequest } = getState().search;

    if (!userRequest?.q) {
      return;
    }

    if (users?.items?.length < users.total_count) {
      dispatch(setUsers(userRequest.q));
    }
  };
};

export const moreCompanies: () => void = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (dispatch: Dispatch<any>, getState: () => AppState) => {
    const { companies, companyRequest } = getState().search;

    if (!companyRequest?.q) {
      return;
    }

    if (companies?.items?.length < companies.total_count) {
      dispatch(setCompanies(companyRequest.q));
    }
  };
};

const setNullAllValues: () => void = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: SET_USERS_ACTION_SEARCH_TYPE,
      payload: null,
    });
    dispatch({
      type: SET_COMPANIES_ACTION_SEARCH_TYPE,
      payload: null,
    });
  };
};

const setUsers: (query: string) => void = (query: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (dispatch: Dispatch<any>, getState: () => AppState) => {
    dispatch(setLoadingSearch(true));

    let { userRequest } = getState().search;
    userRequest = parseOtUpdateRequest(query, userRequest);

    const type = ' type:user'
    if (!userRequest.q.endsWith(type)) {
      userRequest.q += type;
    }

    try {
      const usersResponse = await searchUsers(userRequest);

      dispatch({
        type:
          userRequest.page > 1
            ? ADD_USERS_ACTION_SEARCH_TYPE
            : SET_USERS_ACTION_SEARCH_TYPE,
        payload: usersResponse,
      });

      dispatch(setUserRequestSearch(userRequest));
    } catch (error) {
      showErrorMessage(error as Error);
    }

    dispatch(setLoadingSearch(false));
  };
};

const setCompanies: (query: string) => void = (query: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (dispatch: Dispatch<any>, getState: () => AppState) => {
    dispatch(setLoadingSearch(true));

    let { companyRequest } = getState().search;
    companyRequest = parseOtUpdateRequest(query, companyRequest);

    const type = ' type:org'
    if (!companyRequest.q.endsWith(type)) {
      companyRequest.q += type;
    }

    try {
      const organizationsResponse = await searchUsers(companyRequest);

      dispatch({
        type:
          companyRequest.page > 1
            ? ADD_COMPANIES_ACTION_SEARCH_TYPE
            : SET_COMPANIES_ACTION_SEARCH_TYPE,
        payload: organizationsResponse,
      });

      dispatch(setCompanyRequestSearch(companyRequest));
    } catch (error) {
      showErrorMessage(error as Error);
    }

    dispatch(setLoadingSearch(false));
  };
};

const setLoadingSearch: (loading: boolean) => void = (loading: boolean) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: SET_LOADING_ACTION_SEARCH_TYPE,
      payload: loading,
    });
  };
};

const setUserRequestSearch: (
  request: SearchUsersQueryParamsInterface | null
) => void = (request: SearchUsersQueryParamsInterface | null) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: SET_USER_REQUEST_ACTION_SEARCH_TYPE,
      payload: request,
    });
  };
};

const setCompanyRequestSearch: (
  request: SearchUsersQueryParamsInterface | null
) => void = (request: SearchUsersQueryParamsInterface | null) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: SET_COMPANY_REQUEST_ACTION_SEARCH_TYPE,
      payload: request,
    });
  };
};

// Utils
const parseOtUpdateRequest = (
  query: string,
  request: SearchUsersQueryParamsInterface | null
): SearchUsersQueryParamsInterface => {
  if (!request || request.q !== query) {
    return {
      q: query,
      per_page: 4,
      page: 1,
    };
  }

  if (request.q === query) {
    request.page++;
  }

  return request;
};
