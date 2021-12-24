import { PaginationInterface } from '@github-search-challenge/app/shared/interfaces/pagination.interface';
import { UserInterface } from '@github-search-challenge/app/shared/interfaces/user.interface';
import { initialSearchState } from '@github-search-challenge/app/shared/reducers/search/search.reducer';
import {
  AppState,
  getStore,
  initialState,
} from '@github-search-challenge/app/shared/reducers/store';
import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import Companies from './companies';

describe('Search Companies', () => {
  function renderComponent(state: AppState = initialState): RenderResult {
    return render(
      <Provider store={getStore(state)}>
        <Companies />
      </Provider>
    );
  }

  it('should render successfully', () => {
    const { baseElement } = renderComponent();
    expect(baseElement).toBeTruthy();
  });

  it('should show companies', () => {
    const companies: PaginationInterface<UserInterface> = {
      total_count: 1,
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
    const { getByText } = renderComponent({
      ...initialState,
      search: {
        ...initialSearchState,
        companies,
      },
    });

    expect(getByText(new RegExp(companies.items[0].login, 'i'))).toBeTruthy();
  });
});
