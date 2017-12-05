import { createFeatureSelector, createSelector, ActionReducerMap } from "@ngrx/store";
import { Shifts } from "./../models/shifts.model";
import  * as fromShifts from './shifts.reducers';
import * as fromRoot from './../../../reducers';

export interface ShiftsState {
    shifts : fromShifts.State
}

export interface State extends fromRoot.State {
    'featureShifts' : ShiftsState
}


export const reducers : ActionReducerMap<ShiftsState> = {
    shifts : fromShifts.reducer
}

export const getShiftsState = createFeatureSelector<ShiftsState>('featureShifts');

export const getCollectionState = createSelector(getShiftsState, (state : ShiftsState) => state.shifts);

export const getCollectionPageLength = createSelector(getCollectionState, fromShifts.getPageLength);

export const getCollectionPageSize = createSelector(getCollectionState, fromShifts.getPageSize);

export const getCollectionPageIndex = createSelector(getCollectionState, fromShifts.getPageIndex);

export const getCollectionSortField = createSelector(getCollectionState, fromShifts.getSortField);

export const getCollectionSortDirection = createSelector(getCollectionState, fromShifts.getSortDirection);

export const getCollectionSearchQuery = createSelector(getCollectionState , fromShifts.getSearchQuery);

export const getCollectionData = createSelector(getCollectionState, fromShifts.getCollections);

export const getCollectionError = createSelector(getCollectionState, fromShifts.getError);

export const getCollectionIsLoading = createSelector(getCollectionState, fromShifts.getIsLoading);

export const getCollectionSelectedShift = createSelector(getCollectionState, fromShifts.getSelectedShift);

export const getCollectionIsLoaded = createSelector(getCollectionState, fromShifts.getIsLoaded);