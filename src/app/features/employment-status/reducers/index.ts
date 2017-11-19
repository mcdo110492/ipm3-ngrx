import { createFeatureSelector, createSelector, ActionReducerMap } from "@ngrx/store";
import { EmploymentStatus } from "./../models/employment-status.model";
import  * as fromEmploymentStatus from './employment-status.reducers';
import * as fromRoot from './../../../reducers';

export interface EmploymentStatusState {
    employmentStatus : fromEmploymentStatus.State
}

export interface State extends fromRoot.State {
    'featureEmploymentStatus' : EmploymentStatusState
}


export const reducers : ActionReducerMap<EmploymentStatusState> = {
    employmentStatus : fromEmploymentStatus.reducer
}

export const getState = createFeatureSelector<EmploymentStatusState>('featureEmploymentStatus');

export const getEmploymentStatusState = createSelector(getState, (state : EmploymentStatusState) => state.employmentStatus);

export const getPageLength = createSelector(getEmploymentStatusState, fromEmploymentStatus.getPageLength);

export const getPageSize = createSelector(getEmploymentStatusState, fromEmploymentStatus.getPageSize);

export const getPageIndex = createSelector(getEmploymentStatusState, fromEmploymentStatus.getPageIndex);

export const getSortField = createSelector(getEmploymentStatusState, fromEmploymentStatus.getSortField);

export const getSortDirection = createSelector(getEmploymentStatusState, fromEmploymentStatus.getSortDirection);

export const getSearchQuery = createSelector(getEmploymentStatusState , fromEmploymentStatus.getSearchQuery);

export const getCollection = createSelector(getEmploymentStatusState, fromEmploymentStatus.getCollections);

export const getError = createSelector(getEmploymentStatusState, fromEmploymentStatus.getError);

export const getIsLoading = createSelector(getEmploymentStatusState, fromEmploymentStatus.getIsLoading);

export const getSelectedEmploymentStatus = createSelector(getEmploymentStatusState, fromEmploymentStatus.getSelectedEmploymentStatus);

export const getIsLoaded = createSelector(getEmploymentStatusState, fromEmploymentStatus.getIsLoaded);