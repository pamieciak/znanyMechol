import { createAction } from '@ngrx/store';

export const isAdminActions = {
  isThisAdmin: createAction('[is-admin], True Admin'),
  isntThisAdmin: createAction('[is-admin], False Admin'),
};
