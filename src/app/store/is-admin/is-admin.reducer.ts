import { createReducer, on } from '@ngrx/store';
import { AdminActions } from './is-admin.actions';
import { AdminUserState } from './is-admin.state';

const initialAdminState: AdminUserState = {
  isAdminLoggedIn: false,
};

export const isAdminRecucer = createReducer(
  initialAdminState,
  on(AdminActions.isAdminLoggedIn, state => {
    return {
      ...state,
      isAdmin: true,
    };
  }),
  on(AdminActions.isAdminNotLoggedIn, state => {
    return {
      ...state,
      isAdmin: false,
    };
  })
);
