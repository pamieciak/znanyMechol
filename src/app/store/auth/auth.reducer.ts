import { createReducer, on } from '@ngrx/store';
import { authActions } from './auth.actions';
import { AuthState } from './auth.state';

const initialState: AuthState = {
  isUserAuthorised: false,
};

export const authReducer = createReducer(
  initialState,
  on(authActions.isUserLoggedIn, state => {
    return {
      ...state,
      isUserAuthorised: true,
    };
  }),
  on(authActions.isUserLoggedOff, state => {
    return {
      ...state,
      isUserAuthorised: false,
    };
  })
);
