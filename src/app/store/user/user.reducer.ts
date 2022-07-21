import { createReducer, on } from '@ngrx/store';
import { appUserActions } from './user.actions';
import { appUserState } from './user.state';

const initialUserState: appUserState = {
  appUser: null,
};

export const appUserReducer = createReducer(
  initialUserState,
  on(appUserActions.setUserData, (state, payload) => {
    return {
      ...state,
      singleuser: payload.user,
    };
  })
);
