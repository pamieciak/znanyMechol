import { createReducer, on } from '@ngrx/store';
import { isPassCorrectActions } from './password.actions';
import { isPassCorrectState } from './password.state';

const initialPassCorrect: isPassCorrectState = {
  isPassCorrect: false,
};

export const isPassCorrectReducer = createReducer(
  initialPassCorrect,
  on(isPassCorrectActions.isPassCorrect, state => {
    return {
      ...state,
      isPassCorrect: true,
    };
  }),
  on(isPassCorrectActions.isNotPassCorrect, state => {
    return {
      ...state,
      isPassCorrect: false,
    };
  })
);
