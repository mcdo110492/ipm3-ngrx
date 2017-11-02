import { createFeatureSelector, createSelector, ActionReducerMap } from "@ngrx/store";
import { EmployeeRegister } from "./../models/employee-register.model";
import  * as fromEmployeeRegister from './employee-register.reducers';
import * as fromRoot from './../../../reducers';

export interface EmployeeRegisterState {
    employeeRegister : fromEmployeeRegister.State
}

export interface State extends fromRoot.State {
    'featureEmployeeRegister' : EmployeeRegisterState
}


export const reducers : ActionReducerMap<EmployeeRegisterState> = {
    employeeRegister : fromEmployeeRegister.reducer
}

export const getState = createFeatureSelector<EmployeeRegisterState>('featureEmployeeRegister');

export const getEmployeeRegisterState = createSelector(getState, (state : EmployeeRegisterState) => state.employeeRegister);

export const getEmployeeRegister = createSelector(getEmployeeRegisterState, fromEmployeeRegister.geEmployeeRegister);

