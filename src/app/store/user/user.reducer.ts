import { createReducer, on } from '@ngrx/store';
import { singleuserActions } from './user.actions';
import { singleUserState } from './user.state';

const initialUserState: singleUserState = {
  singleuser: null,
};

export const singleUserReducer = createReducer(
  initialUserState,
  on(singleuserActions.userData, (state, payload) => {
    return {
      ...state,
      singleuser: payload.user,
    };
  })
);
