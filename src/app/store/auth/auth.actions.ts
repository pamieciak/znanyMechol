import { createAction, props } from '@ngrx/store';

export const authActions = {
  isLogedInTrue: createAction('[Auth], True LogedIn', props<{ value: string; age: number }>()),
  isLogedInFalse: createAction('[Auth], False LogedIn'),
};
