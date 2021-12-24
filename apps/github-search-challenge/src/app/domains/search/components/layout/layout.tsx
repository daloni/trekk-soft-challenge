import ROUTES from '@github-search-challenge/app/shared/config/routes';
import { PaginationInterface } from '@github-search-challenge/app/shared/interfaces/pagination.interface';
import { UserInterface } from '@github-search-challenge/app/shared/interfaces/user.interface';
import { searchAction } from '@github-search-challenge/app/shared/reducers/search/actions';
import { AppState } from '@github-search-challenge/app/shared/reducers/store';
import debounce from 'lodash/debounce';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';

export const title = 'Search for Github Users';

export function Layout() {
  const dispatch = useDispatch();

  const onChangeSearchInput = debounce(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const input = event.target as HTMLInputElement;
      dispatch(searchAction(input.value));
    },
    500
  );

  const users: PaginationInterface<UserInterface> = useSelector(
    (state: AppState) => state.search.users
  );
  const companies: PaginationInterface<UserInterface> = useSelector(
    (state: AppState) => state.search.companies
  );

  return (
    <div>
      <h1>{title}</h1>
      <input aria-label="search-input" onChange={onChangeSearchInput} />
      <div>
        <NavLink className="app-header-menu-item" to={ROUTES.SEARCH_USERS_PAGE}>
          <div className="app-header-menu-item-text">USERS ({ users?.total_count || 0 })</div>
        </NavLink>
        <NavLink
          className="app-header-menu-item"
          to={ROUTES.SEARCH_COMPANIES_PAGE}
        >
          <div className="app-header-menu-item-text">COMPANIES ({ companies?.total_count || 0 })</div>
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
