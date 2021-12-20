import debounce from 'lodash/debounce';
import { ChangeEvent } from 'react';
import { Outlet } from 'react-router';
import { searchUsers } from '../../../shared/services/users.service';

export const title = 'Search for Github Users';

export function Layout() {
  const onChangeSearchInput = debounce(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const input = event.target as HTMLInputElement;
      return await searchUsers({ q: input.value, per_page: 4, page: 1 });
    },
    500
  );

  return (
    <div>
      <h1>{title}</h1>
      <input
        aria-label="search-input"
        onChange={onChangeSearchInput}
      />
      <Outlet />
    </div>
  );
}

export default Layout;
