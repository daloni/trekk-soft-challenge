import { render, RenderResult, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../../app';
import { getStore } from '../reducers/store';
import { showErrorMessage } from './errors';

describe('Errors', () => {
  function renderAppComponent(): RenderResult {
    return render(
      <Provider store={getStore()}>
        <App />
      </Provider>
    );
  }

  it('should show message in App', async () => {
    const message = 'My custom error message';
    renderAppComponent();
    showErrorMessage(new Error(message));
    expect(await screen.findByText(message)).toBeTruthy();
  });
});
