import { createAction, props } from '@ngrx/store';
import { User } from 'app/auth/user.interface';

export const setUserListActions = {
  setUsers: createAction('[user-list] Set Users List', props<{ users: User[] }>()),
};
