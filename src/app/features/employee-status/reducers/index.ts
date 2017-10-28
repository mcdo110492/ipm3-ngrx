import { createFeatureSelector, createSelector, ActionReducerMap } from "@ngrx/store";
import { EmployeeStatus } from "./../models/employee-status.model";
import  * as fromEmployeeStatus from './employee-status.reducers';
import * as fromRoot from './../../../reducers';

export interface EmployeeStatusState {
    employeeStatus : fromEmployeeStatus.State
}

export interface State extends fromRoot.State {
    'featureEmployeeStatus' : EmployeeStatusState
}


export const reducers : ActionReducerMap<EmployeeStatusState> = {
    employeeStatus : fromEmployeeStatus.reducer
}

export const getState = createFeatureSelector<EmployeeStatusState>('featureEmployeeStatus');

export const getEmployeeStatusState = createSelector(getState, (state : EmployeeStatusState) => state.employeeStatus);

export const getPageLength = createSelector(getEmployeeStatusState, fromEmployeeStatus.getPageLength);

export const getPageSize = createSelector(getEmployeeStatusState, fromEmployeeStatus.getPageSize);

export const getPageIndex = createSelector(getEmployeeStatusState, fromEmployeeStatus.getPageIndex);

export const getSortField = createSelector(getEmployeeStatusState, fromEmployeeStatus.getSortField);

export const getSortDirection = createSelector(getEmployeeStatusState, fromEmployeeStatus.getSortDirection);

export const getSearchQuery = createSelector(getEmployeeStatusState , fromEmployeeStatus.getSearchQuery);

export const getCollection = createSelector(getEmployeeStatusState, fromEmployeeStatus.getCollections);

export const getError = createSelector(getEmployeeStatusState, fromEmployeeStatus.getError);

export const getIsLoading = createSelector(getEmployeeStatusState, fromEmployeeStatus.getIsLoading);

export const getSelectedCollection = createSelector(getEmployeeStatusState, fromEmployeeStatus.getSelectedCollection);