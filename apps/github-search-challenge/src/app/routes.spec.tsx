import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';

import AppRoutes from './routes';
import { getStore } from './shared/reducers/store';

describe('AppRoutes', () => {
  function renderComponent(): RenderResult {
    return render(
      <Provider store={getStore()}>
        <AppRoutes />
      </Provider>
    );
  }

  it('should render successfully', () => {
    const { baseElement } = renderComponent();

    expect(baseElement).toBeTruthy();
  });
});
