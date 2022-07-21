import { createReducer, on } from '@ngrx/store';
import { appUserActions } from './user.actions';
import { AppUserState } from './user.state';

const initialUserState: AppUserState = {
  value: null,
};

export const appUserReducer = createReducer(
  initialUserState,
  on(appUserActions.setUserData, (state, payload) => {
    return {
      ...state,
      value: payload.user,
    };
  })
);
