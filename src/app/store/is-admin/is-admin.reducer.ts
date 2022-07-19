import { createReducer, on } from '@ngrx/store';
import { isAdminActions } from './is-admin.actions';

import { isAdminState } from './is-admin.state';

const initialAdminState: isAdminState = {
  isAdmin: false,
};

export const isAdminRecucer = createReducer(
  initialAdminState,
  on(isAdminActions.isThisAdmin, state => {
    return {
      ...state,
      isAdmin: true,
    };
  }),
  on(isAdminActions.isntThisAdmin, state => {
    return {
      ...state,
      isAdmin: false,
    };
  })
);
