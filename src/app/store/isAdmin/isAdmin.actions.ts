import { createAction } from '@ngrx/store';

export const isAdminActions = {
  isThisAdmin: createAction('[isAdmin], True Admin'),
  isntThisAdmin: createAction('[isAdmin], False Admin'),
};
