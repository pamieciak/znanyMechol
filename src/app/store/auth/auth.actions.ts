import { createAction } from '@ngrx/store';

export const authActions = {
  isLogedInTrue: createAction('[Auth], True LogedIn'),
  isLogedInFalse: createAction('[Auth], False LogedIn'),
};
