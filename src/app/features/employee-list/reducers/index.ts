import { createFeatureSelector, createSelector, ActionReducerMap } from "@ngrx/store";
import { EmployeeList } from "./../models/employee-list.models";
import  * as fromEmployeeList from './employee-list.reducers';
import * as fromRoot from './../../../reducers';

export interface EmployeeListState {
    employeeList : fromEmployeeList.State
}

export interface State extends fromRoot.State {
    'featureEmployeeList' : EmployeeListState
}


export const reducers : ActionReducerMap<EmployeeListState> = {
    employeeList : fromEmployeeList.reducer
}

export const getState = createFeatureSelector<EmployeeListState>('featureEmployeeList');

export const getEmployeeListState = createSelector(getState, (state : EmployeeListState) => state.employeeList);

export const getPageLength = createSelector(getEmployeeListState, fromEmployeeList.getPageLength);

export const getPageSize = createSelector(getEmployeeListState, fromEmployeeList.getPageSize);

export const getPageIndex = createSelector(getEmployeeListState, fromEmployeeList.getPageIndex);

export const getSortField = createSelector(getEmployeeListState, fromEmployeeList.getSortField);

export const getSortDirection = createSelector(getEmployeeListState, fromEmployeeList.getSortDirection);

export const getSearchQuery = createSelector(getEmployeeListState , fromEmployeeList.getSearchQuery);

export const getCollection = createSelector(getEmployeeListState, fromEmployeeList.getCollections);

export const getError = createSelector(getEmployeeListState, fromEmployeeList.getError);

export const getIsLoading = createSelector(getEmployeeListState, fromEmployeeList.getIsLoading);
