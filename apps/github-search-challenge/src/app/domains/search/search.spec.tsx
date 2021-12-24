import { getStore } from '@github-search-challenge/app/shared/reducers/store';
import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import Search from './search';

describe('Search', () => {
  function renderComponent(): RenderResult {
    return render(
      <Provider store={getStore()}>
        <Search />
      </Provider>
    );
  }

  it('should render successfully', () => {
    const { baseElement } = renderComponent();
    expect(baseElement).toBeTruthy();
  });
});
