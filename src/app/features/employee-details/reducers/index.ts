

import { createFeatureSelector, createSelector, ActionReducerMap } from "@ngrx/store";

import * as fromRoot from './../../../reducers';

import  * as fromEmp from './employee-details.reducers';
import * as fromPersonal from './../employee-personal-information/reducers/employee-personal.reducers';

export interface EmployeeDetailsState {
    employeeDetails : fromEmp.State,
    personal        : fromPersonal.State
}

export interface State extends fromRoot.State {
    'featureEmployeeDetails' : EmployeeDetailsState
}


export const reducers : ActionReducerMap<EmployeeDetailsState> = {
    employeeDetails : fromEmp.reducer,
    personal        : fromPersonal.reducer
}

export const getState = createFeatureSelector<EmployeeDetailsState>('featureEmployeeDetails');


export const getEmployeeDetailsState = createSelector(getState, (state : EmployeeDetailsState) => state.employeeDetails);

export const getEmployeeId = createSelector(getEmployeeDetailsState, fromEmp.getEmployeeId);


export const getPersonalState  = createSelector(getState, (state : EmployeeDetailsState) => state.personal);

export const getPersonal = createSelector(getPersonalState, fromPersonal.getPersonal);
