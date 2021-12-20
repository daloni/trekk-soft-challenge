import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { PaginationInterface } from '../../../shared/interfaces/pagination.interface';
import { UsersInterface } from '../../../shared/interfaces/user.interface';
import * as UsersService from '../../../shared/services/users.service';
import { Layout, title } from './layout';

describe('Layout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should render successfully', () => {
    const { baseElement } = render(<Layout />);
    expect(baseElement).toBeTruthy();
  });

  it('should have the title', () => {
    const { getByText } = render(<Layout />);

    expect(getByText(new RegExp(title, 'gi'))).toBeTruthy();
  });

  it('should call search when change input', () => {
    const params: UsersService.SearchUsersQueryParamsInterface = {
      q: 't2',
      per_page: 4,
      page: 1,
    };
    render(<Layout />);

    const spy = jest
      .spyOn(UsersService, 'searchUsers')
      .mockImplementation(
        async () =>
          ({ total_count: 100 } as PaginationInterface<UsersInterface>)
      );

    fireEvent.change(screen.getByLabelText('search-input'), {
      target: {
        value: 't',
      },
    });
    expect(spy).not.toBeCalled();

    fireEvent.change(screen.getByLabelText('search-input'), {
      target: {
        value: params.q,
      },
    });

    waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(params);
    });
  });
});
