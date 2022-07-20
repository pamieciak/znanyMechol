import { createAction } from '@ngrx/store';

export const isPassCorrectActions = {
  isPassCorrect: createAction('[password], check if password match'),
  isNotPassCorrect: createAction('[password], check if password dont match'),
};
