import { createReducer, on } from '@ngrx/store';
import { setSpecialistsListAction } from './specialist-list.actions';
import { SpecialistListState } from './specialist-list.state';

const initialSpecialistListState: SpecialistListState = {
  specialists: [],
};

export const setSpecialistsListReducer = createReducer(
  initialSpecialistListState,
  on(setSpecialistsListAction.setSpecialists, (state, payload) => {
    return {
      ...state,
      specialists: payload.specialists,
    };
  }),

  on(setSpecialistsListAction.addUpdatedSpecialist, (state, payload) => {
    return {
      ...state,
      specialists: state.specialists.map(specialist => {
        if (specialist.id === payload.updatedSpecialist.id) {
          return payload.updatedSpecialist;
        } else {
          return specialist;
        }
      }),
    };
  }),
  on(setSpecialistsListAction.deleteSpecialist, (state, payload) => {
    return {
      ...state,
      specialists: state.specialists.filter(specialist => {
        return specialist.id != payload.id;
      }),
    };
  })
);
