import { PaginationInterface } from '@github-search-challenge/app/shared/interfaces/pagination.interface';
import { UserInterface } from '@github-search-challenge/app/shared/interfaces/user.interface';
import { moreUsers } from '@github-search-challenge/app/shared/reducers/search/actions';
import { AppState } from '@github-search-challenge/app/shared/reducers/store';
import { useDispatch, useSelector } from 'react-redux';

export function Users() {
  const dispatch = useDispatch();

  const users: PaginationInterface<UserInterface> = useSelector(
    (state: AppState) => state.search?.users
  );

  const showMore = (): void => {
    dispatch(moreUsers());
  };

  return (
    <div>
      <div>
        {users?.items.map((el: UserInterface) => {
          return <div key={el.id}>{el.login}</div>;
        })}
      </div>
      {users?.items?.length < users?.total_count && (
        <button onClick={showMore}>Show more</button>
      )}
    </div>
  );
}

export default Users;
