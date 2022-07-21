import { createAction } from '@ngrx/store';

export const adminActions = {
  isAdminLoggedIn: createAction('[admin-user], check if admin is logged in'),
  isAdminNotLoggedIn: createAction('[admin-user], check if admin is not logged in'),
};
