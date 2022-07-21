import { createAction, props } from '@ngrx/store';
import { User } from 'app/auth/user.interface';

export const appUserActions = {
  setUserData: createAction('[user] get user data', props<{ user: User }>()),
};
