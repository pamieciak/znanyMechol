import { createAction, props } from '@ngrx/store';
import { User } from 'app/auth/user.interface';

export const singleuserActions = {
  userData: createAction('[user] get user data', props<{ user: User }>()),
};
