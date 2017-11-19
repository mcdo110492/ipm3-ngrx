import { createFeatureSelector, createSelector, ActionReducerMap } from "@ngrx/store";
import { CollectionSchedules } from "./../models/collection-schedules.model";
import  * as fromCollectionSchedules from './collection-schedules.reducers';
import * as fromRoot from './../../../reducers';

export interface CollectionSchedulesState {
    collectionSchedules : fromCollectionSchedules.State
}

export interface State extends fromRoot.State {
    'featureCollectionSchedules' : CollectionSchedulesState
}


export const reducers : ActionReducerMap<CollectionSchedulesState> = {
    collectionSchedules : fromCollectionSchedules.reducer
}

export const getCollectionSchedulesState = createFeatureSelector<CollectionSchedulesState>('featureCollectionSchedules');

export const getCollectionState = createSelector(getCollectionSchedulesState, (state : CollectionSchedulesState) => state.collectionSchedules);

export const getCollectionPageLength = createSelector(getCollectionState, fromCollectionSchedules.getPageLength);

export const getCollectionPageSize = createSelector(getCollectionState, fromCollectionSchedules.getPageSize);

export const getCollectionPageIndex = createSelector(getCollectionState, fromCollectionSchedules.getPageIndex);

export const getCollectionSortField = createSelector(getCollectionState, fromCollectionSchedules.getSortField);

export const getCollectionSortDirection = createSelector(getCollectionState, fromCollectionSchedules.getSortDirection);

export const getCollectionSearchQuery = createSelector(getCollectionState , fromCollectionSchedules.getSearchQuery);

export const getCollectionData = createSelector(getCollectionState, fromCollectionSchedules.getCollections);

export const getCollectionError = createSelector(getCollectionState, fromCollectionSchedules.getError);

export const getCollectionIsLoading = createSelector(getCollectionState, fromCollectionSchedules.getIsLoading);

export const getCollectionSelectedCollectionSchedule = createSelector(getCollectionState, fromCollectionSchedules.getSelectedCollectionSchedule);

export const getCollectionIsLoaded = createSelector(getCollectionState, fromCollectionSchedules.getIsLoaded);