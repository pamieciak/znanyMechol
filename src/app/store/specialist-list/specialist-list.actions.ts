import { createAction, props } from '@ngrx/store';
import { Specialist } from 'app/shell/specialist-view/specialist.intefrace';

export const setSpecialistsListAction = {
  setSpecialists: createAction('[specialist-list] Set Specialists List', props<{ specialists: Specialist[] }>()),
  addUpdatedSpecialist: createAction(
    '[specialist-list] Edit specialist data',
    props<{ updatedSpecialist: Specialist }>()
  ),
  deleteSpecialist: createAction('[specialist-list] Delete Specialist', props<{ id: number | undefined }>()),
};
