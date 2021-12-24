import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SearchLayout from './domains/search/components/layout/layout';
import Companies from './domains/search/pages/companies/companies';
import Users from './domains/search/pages/users/users';
import Search from './domains/search/search';
import ROUTES from './shared/config/routes';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.MAIN_PAGE}>
          <Route path={ROUTES.SEARCH_PAGE} element={<SearchLayout />}>
            <Route index element={<Search />} />
            <Route path={ROUTES.SEARCH_USERS_PAGE} element={<Users />} />
            <Route path={ROUTES.SEARCH_COMPANIES_PAGE} element={<Companies />} />
          </Route>
          <Route
            path={ROUTES.MAIN_PAGE}
            element={<Navigate to={ROUTES.SEARCH_PAGE} />}
          />
        </Route>
        <Route
          path={ROUTES.NOT_FOUND_PAGE}
          element={<Navigate to={ROUTES.MAIN_PAGE} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
