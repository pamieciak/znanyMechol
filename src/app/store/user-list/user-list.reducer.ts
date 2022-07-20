import { createReducer, on } from '@ngrx/store';
import { setUserListActions } from './user-list.actions';
import { UserListState } from './user-list.state';

const initialUserListState: UserListState = {
  users: [],
};

export const setUserListReducer = createReducer(
  initialUserListState,
  on(setUserListActions.setUsers, (state, payload) => {
    return {
      ...state,
      users: payload.users,
    };
  })
);
