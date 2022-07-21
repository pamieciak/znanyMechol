import { createAction } from '@ngrx/store';

export const authActions = {
  isUserLoggedIn: createAction('[Auth], check if user is logged in'),
  isUserLoggedOff: createAction('[Auth], check if user is logged off'),
};
