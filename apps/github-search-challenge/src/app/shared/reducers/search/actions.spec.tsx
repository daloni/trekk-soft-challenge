import { waitFor } from '@testing-library/react';
import { AnyAction } from 'redux';
import { PaginationInterface } from '../../interfaces/pagination.interface';
import { UserInterface } from '../../interfaces/user.interface';
import * as UsersService from '../../services/users.service';
import * as Errors from '../../utils/errors';
import { getStore, initialState } from '../store';
import { moreCompanies, moreUsers, searchAction } from './actions';
import { initialSearchState } from './search.reducer';

describe('Search Reducer Actions', () => {
  const request: UsersService.SearchUsersQueryParamsInterface = {
    q: 'searchString',
    per_page: 4,
    page: 1,
  };

  const users: PaginationInterface<UserInterface> = {
    total_count: 10,
    incomplete_results: false,
    items: [
      {
        login: 'CustomUser',
        id: 1,
        node_id: 'string',
        avatar_url: 'string',
        gravatar_id: 'string',
        url: 'string',
        html_url: 'string',
        followers_url: 'string',
        following_url: 'string',
        gists_url: 'string',
        starred_url: 'string',
        subscriptions_url: 'string',
        organizations_url: 'string',
        repos_url: 'string',
        events_url: 'string',
        received_events_url: 'string',
        type: 'string',
        site_admin: false,
        score: 1,
      },
    ],
  };

  const users2: PaginationInterface<UserInterface> = {
    total_count: 10,
    incomplete_results: false,
    items: [
      {
        login: 'CustomUser',
        id: 1,
        node_id: 'string',
        avatar_url: 'string',
        gravatar_id: 'string',
        url: 'string',
        html_url: 'string',
        followers_url: 'string',
        following_url: 'string',
        gists_url: 'string',
        starred_url: 'string',
        subscriptions_url: 'string',
        organizations_url: 'string',
        repos_url: 'string',
        events_url: 'string',
        received_events_url: 'string',
        type: 'string',
        site_admin: false,
        score: 1,
      },
    ],
  };

  it('should searchAction service success', async () => {
    const response = {
      total_count: 100,
    } as PaginationInterface<UserInterface>;

    const spy = jest
      .spyOn(UsersService, 'searchUsers')
      .mockImplementation(async () => response);

    const store = getStore();
    store.dispatch((await searchAction(request.q)) as unknown as AnyAction);

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith({
        ...request,
        q: request.q + ' type:user',
      });
      expect(spy).toHaveBeenCalledWith({
        ...request,
        q: request.q + ' type:org',
      });
    });

    expect(store.getState()?.search?.users).toEqual(response);
  });

  it('should searchAction service fails', async () => {
    const error = new Error('message');

    const spy = jest
      .spyOn(UsersService, 'searchUsers')
      .mockRejectedValue(error);
    const spyError = jest
      .spyOn(Errors, 'showErrorMessage')
      .mockImplementation();

    const store = getStore();
    store.dispatch((await searchAction(request.q)) as unknown as AnyAction);

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith({
        ...request,
        q: request.q + ' type:user',
      });
      expect(spy).toHaveBeenCalledWith({
        ...request,
        q: request.q + ' type:org',
      });
    });

    await waitFor(() => {
      expect(spyError).toHaveBeenCalledTimes(2);
      expect(spyError).toHaveBeenCalledWith(error);
    });
  });

  it('should set null when query is empty', async () => {
    const store = getStore();
    store.dispatch((await searchAction('')) as unknown as AnyAction);

    await waitFor(() => {
      expect(store.getState()?.search?.users).toEqual(null);
      expect(store.getState()?.search?.userRequest).toEqual(null);
      expect(store.getState()?.search?.companies).toEqual(null);
      expect(store.getState()?.search?.companyRequest).toEqual(null);
    });
  });

  it('should moreUsers work', async () => {
    const spy = jest
      .spyOn(UsersService, 'searchUsers')
      .mockImplementation(async () => users);
    const type = ' type:user';

    const store = getStore({
      ...initialState,
      search: {
        ...initialSearchState,
        userRequest: { ...request },
        users: {
          total_count: 10,
          incomplete_results: false,
          items: [],
        },
      },
    });
    store.dispatch((await moreUsers()) as unknown as AnyAction);

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({
        ...request,
        page: 2,
        q: request.q + type,
      });
    });

    await waitFor(() => {
      expect(store.getState()?.search?.users).toEqual(users);
      expect(store.getState()?.search?.userRequest).toEqual({
        ...request,
        page: 2,
        q: request.q + type,
      });
    });

    spy.mockClear();
    spy.mockImplementation(async () => users2);
    expect(spy).toHaveBeenCalledTimes(0);

    store.dispatch((await moreUsers()) as unknown as AnyAction);

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({
        ...request,
        page: 3,
        q: request.q + type,
      });
    });

    await waitFor(() => {
      expect(store.getState()?.search?.users).toEqual({
        ...users,
        items: [
          ...users.items,
          ...users2.items,
        ]
      });
      expect(store.getState()?.search?.userRequest).toEqual({
        ...request,
        page: 3,
        q: request.q + type,
      });
    });
  });

  it('should moreCompanies work', async () => {
    const spy = jest
      .spyOn(UsersService, 'searchUsers')
      .mockImplementation(async () => users);
    const type = ' type:org';

    const store = getStore({
      ...initialState,
      search: {
        ...initialSearchState,
        companyRequest: { ...request },
        companies: {
          total_count: 10,
          incomplete_results: false,
          items: [],
        },
      },
    });
    store.dispatch((await moreCompanies()) as unknown as AnyAction);

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({
        ...request,
        page: 2,
        q: request.q + type,
      });
    });

    await waitFor(() => {
      expect(store.getState()?.search?.companies).toEqual(users);
      expect(store.getState()?.search?.companyRequest).toEqual({
        ...request,
        page: 2,
        q: request.q + type,
      });
    });

    spy.mockClear();
    spy.mockImplementation(async () => users2);
    expect(spy).toHaveBeenCalledTimes(0);

    store.dispatch((await moreCompanies()) as unknown as AnyAction);

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({
        ...request,
        page: 3,
        q: request.q + type,
      });
    });

    await waitFor(() => {
      expect(store.getState()?.search?.companies).toEqual({
        ...users,
        items: [
          ...users.items,
          ...users2.items,
        ]
      });
      expect(store.getState()?.search?.companyRequest).toEqual({
        ...request,
        page: 3,
        q: request.q + type,
      });
    });
  });
});
