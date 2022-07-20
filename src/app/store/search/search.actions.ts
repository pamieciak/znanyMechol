import { createAction, props } from '@ngrx/store';

export const searchActions = {
  search: createAction('[search] Search typed value', props<{ search: string | undefined }>()),
};
