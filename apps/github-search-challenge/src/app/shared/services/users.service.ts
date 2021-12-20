import { baseCall } from '../utils/request.base';
import { RequestInterface, RequestMethod } from '../config/request.interface';
import { PaginationInterface } from '../interfaces/pagination.interface';
import { UsersInterface } from '../interfaces/user.interface';

export const SearchUsersRequest: RequestInterface = {
  url: 'https://api.github.com/search/users',
  method: RequestMethod.GET,
};

export interface SearchUsersQueryParamsInterface {
  q: string;
  per_page: number;
  page: number;
}

export const searchUsers = (
  request: SearchUsersQueryParamsInterface
): Promise<PaginationInterface<UsersInterface>> => {
  const url = new URL(SearchUsersRequest.url);
  const queryParams = request as unknown as Record<string, string>;
  url.search = new URLSearchParams(queryParams).toString();

  return baseCall<PaginationInterface<UsersInterface>>(
    { ...SearchUsersRequest, url: url.toString() },
    {}
  );
};
