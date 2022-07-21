import { createReducer, on } from '@ngrx/store';
import { adminActions } from './admin-user.actions';
import { AdminUserState } from './admin-user.state';

const initialAdminState: AdminUserState = {
  isAdminLoggedIn: false,
};

export const isAdminRecucer = createReducer(
  initialAdminState,
  on(adminActions.isAdminLoggedIn, state => {
    return {
      ...state,
      isAdminLoggedIn: true,
    };
  }),
  on(adminActions.isAdminNotLoggedIn, state => {
    return {
      ...state,
      isAdminLoggedIn: false,
    };
  })
);
