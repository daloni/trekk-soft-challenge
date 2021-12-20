import {
  searchUsers,
  SearchUsersQueryParamsInterface,
  SearchUsersRequest,
} from './users.service';
import { FetchMock } from 'jest-fetch-mock';
import { PaginationInterface } from '../interfaces/pagination.interface';
import { UsersInterface } from '../interfaces/user.interface';

describe('Users Service', () => {
  const request: SearchUsersQueryParamsInterface = {
    q: 'test',
    per_page: 100,
    page: 100,
  };
  const url: string = SearchUsersRequest.url + '?q=test&per_page=100&page=100';
  const headers: RequestInit = {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  }

  beforeEach(() => {
    (fetch as FetchMock).resetMocks();
  });

  it('should request to url', async () => {
    const response: PaginationInterface<UsersInterface> = {
      total_count: 100,
      incomplete_results: false,
      items: [
        {
          login: 'string',
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
    (fetch as FetchMock).mockResponseOnce(JSON.stringify(response));

    const users = await searchUsers(request);

    expect(users).toEqual(response);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, headers);
  });

  it('should returns null when exception', async () => {
    const response = 'API is down';
    (fetch as FetchMock).mockReject(() => Promise.reject(response));

    await expect(searchUsers(request)).rejects.toMatch(response);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, headers);
  });
});
