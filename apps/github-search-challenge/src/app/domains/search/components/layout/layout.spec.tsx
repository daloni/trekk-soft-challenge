import * as UsersAction from '@github-search-challenge/app/shared/reducers/search/actions';
import { getStore } from '@github-search-challenge/app/shared/reducers/store';
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Layout, title } from './layout';

describe('Layout', () => {
  function renderComponent(): RenderResult {
    return render(
      <Provider store={getStore()}>
        <MemoryRouter>
          <Layout />
        </MemoryRouter>
      </Provider>
    );
  }

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should render successfully', () => {
    const { baseElement } = renderComponent();
    expect(baseElement).toBeTruthy();
  });

  it('should have the title', () => {
    const { getByText } = renderComponent();

    expect(getByText(new RegExp(title, 'gi'))).toBeTruthy();
  });

  it('should call search when change input', async () => {
    const paramsQuery = 't2';
    const { getByLabelText } = renderComponent();

    const spy = jest
      .spyOn(UsersAction, 'searchAction')
      .mockImplementation(() => ({ type: 'Add' }));

    fireEvent.change(getByLabelText('search-input'), {
      target: { value: 't' },
    });
    expect(spy).not.toBeCalled();

    fireEvent.change(getByLabelText('search-input'), {
      target: { value: paramsQuery },
    });

    jest.runAllTimers();

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(paramsQuery);
    });
  });
});
