import { createFeatureSelector, createSelector, ActionReducerMap } from "@ngrx/store";
import { Units } from "./../models/units.model";
import  * as fromUnits from './units.reducers';
import * as fromRoot from './../../../reducers';

export interface UnitsState {
    units : fromUnits.State
}

export interface State extends fromRoot.State {
    'featureUnits' : UnitsState
}


export const reducers : ActionReducerMap<UnitsState> = {
    units : fromUnits.reducer
}

export const getUnitsState = createFeatureSelector<UnitsState>('featureUnits');

export const getCollectionState = createSelector(getUnitsState, (state : UnitsState) => state.units);

export const getCollectionPageLength = createSelector(getCollectionState, fromUnits.getPageLength);

export const getCollectionPageSize = createSelector(getCollectionState, fromUnits.getPageSize);

export const getCollectionPageIndex = createSelector(getCollectionState, fromUnits.getPageIndex);

export const getCollectionSortField = createSelector(getCollectionState, fromUnits.getSortField);

export const getCollectionSortDirection = createSelector(getCollectionState, fromUnits.getSortDirection);

export const getCollectionSearchQuery = createSelector(getCollectionState , fromUnits.getSearchQuery);

export const getCollectionData = createSelector(getCollectionState, fromUnits.getCollections);

export const getCollectionError = createSelector(getCollectionState, fromUnits.getError);

export const getCollectionIsLoading = createSelector(getCollectionState, fromUnits.getIsLoading);

export const getCollectionSelectedUnits = createSelector(getCollectionState, fromUnits.getSelectedUnits);

export const getCollectionIsLoaded = createSelector(getCollectionState, fromUnits.getIsLoaded);