import { PaginationInterface } from '@github-search-challenge/app/shared/interfaces/pagination.interface';
import { UserInterface } from '@github-search-challenge/app/shared/interfaces/user.interface';
import { moreCompanies } from '@github-search-challenge/app/shared/reducers/search/actions';
import { AppState } from '@github-search-challenge/app/shared/reducers/store';
import { useDispatch, useSelector } from 'react-redux';

export function Companies() {
  const dispatch = useDispatch();

  const companies: PaginationInterface<UserInterface> = useSelector(
    (state: AppState) => state.search?.companies
  );

  const showMore = (): void => {
    dispatch(moreCompanies());
  };

  return (
    <div>
      <div>
        {companies?.items.map((el: UserInterface) => {
          return <div key={el.id}>{el.login}</div>;
        })}
      </div>
      {companies?.items?.length < companies?.total_count && (
        <button onClick={showMore}>Show more</button>
      )}
    </div>
  );
}

export default Companies;
