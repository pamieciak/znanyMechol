import { createAction } from '@ngrx/store';

export const AdminActions = {
  isAdminLoggedIn: createAction('[is-admin], check if admin is logged in'),
  isAdminNotLoggedIn: createAction('[is-admin], check if admin is not logged in'),
};
