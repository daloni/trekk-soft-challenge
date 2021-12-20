import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import SearchLayout from './pages/search/layout/layout';
import Search from './pages/search/search';
import ROUTES from './shared/config/routes';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.MAIN_PAGE}>
          <Route path={ROUTES.SEARCH_PAGE} element={<SearchLayout />}>
            <Route index element={<Search />} />
          </Route>
          <Route path={ROUTES.MAIN_PAGE} element={<Navigate to={ROUTES.SEARCH_PAGE} />} />
        </Route>
        <Route path={ROUTES.NOT_FOUND_PAGE} element={<Navigate to={ROUTES.MAIN_PAGE} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
