import { createReducer, on } from '@ngrx/store';
import { searchActions } from './search.actions';
import { SearchState } from './search.state';

const initialSearchState: SearchState = {
  search: '',
};

export const searchReducer = createReducer(
  initialSearchState,
  on(searchActions.search, (state, payload) => {
    return {
      ...state,
      search: payload.search,
    };
  })
);
