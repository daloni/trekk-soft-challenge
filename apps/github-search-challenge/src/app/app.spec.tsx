import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';

import App from './app';
import { getStore } from './shared/reducers/store';

describe('App', () => {
  function renderComponent(): RenderResult {
    return render(
      <Provider store={getStore()}>
        <App />
      </Provider>
    );
  }

  it('should render successfully', () => {
    const { baseElement } = renderComponent();

    expect(baseElement).toBeTruthy();
  });
});
