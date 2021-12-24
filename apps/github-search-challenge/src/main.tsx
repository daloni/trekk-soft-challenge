import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/app';
import { getStore } from './app/shared/reducers/store';

ReactDOM.render(
  <Provider store={getStore()}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
  document.getElementById('root')
);
