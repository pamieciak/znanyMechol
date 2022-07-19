import { createReducer, on } from '@ngrx/store';
import { authActions } from './auth.actions';
import { AuthState } from './auth.state';

const initialState: AuthState = {
  isAuth: false,
};

export const authReducer = createReducer(
  initialState,
  on(authActions.isLogedInTrue, (state, payload) => {
    console.log(payload);
    return {
      ...state,
      isAuth: true,
    };
  }),
  on(authActions.isLogedInFalse, state => {
    return {
      ...state,
      isAuth: false,
    };
  })
);
