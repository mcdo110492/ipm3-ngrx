

import { createFeatureSelector, createSelector, ActionReducerMap } from "@ngrx/store";

import * as fromRoot from './../../../reducers';

import  * as fromEmp from './employee-details.reducers';
import * as fromPersonal from './../employee-personal-information/reducers/employee-personal.reducers';
import * as fromEmployment from './../employee-employment-information/reducers/employee-employment.reducers';
import * as fromContact from './../employee-contact-information/reducers/employee-contact.reducers';
import * as fromGovernment from './../employee-government-information/reducers/employee-government.reducers';
import * as fromHealth from './../employee-health-information/reducers/employee-health.reducers';
import * as fromLicense from './../employee-licenses/reducers/employee-license.reducers';
import * as fromEducational from './../employee-educational/reducers/employee-educational.reducers';

export interface EmployeeDetailsState {
    employeeDetails : fromEmp.State;
    personal        : fromPersonal.State;
    employment      : fromEmployment.State;
    contact         : fromContact.State;
    government      : fromGovernment.State;
    health          : fromHealth.State;
    licenses        : fromLicense.State;
    educational     : fromEducational.State;
}

export interface State extends fromRoot.State {
    'featureEmployeeDetails' : EmployeeDetailsState
}


export const reducers : ActionReducerMap<EmployeeDetailsState> = {
    employeeDetails : fromEmp.reducer,
    personal        : fromPersonal.reducer,
    employment      : fromEmployment.reducer,
    contact         : fromContact.reducer,
    government      : fromGovernment.reducer,
    health          : fromHealth.reducer,
    licenses        : fromLicense.reducer,
    educational     : fromEducational.reducer
}

export const getState = createFeatureSelector<EmployeeDetailsState>('featureEmployeeDetails');


export const getEmployeeDetailsState = createSelector(getState, (state : EmployeeDetailsState) => state.employeeDetails);

export const getEmployeeId = createSelector(getEmployeeDetailsState, fromEmp.getEmployeeId);


export const getPersonalState  = createSelector(getState, (state : EmployeeDetailsState) => state.personal);

export const getPersonal = createSelector(getPersonalState, fromPersonal.getPersonal);


export const getEmploymentState  = createSelector(getState, (state : EmployeeDetailsState) => state.employment);

export const getEmployment = createSelector(getEmploymentState, fromEmployment.getEmployment);


export const getContactState = createSelector(getState, (state : EmployeeDetailsState) => state.contact);

export const getContact = createSelector(getContactState, fromContact.getContact);


export const getGovernmentState = createSelector(getState, (state : EmployeeDetailsState) => state.government );

export const getGovernment = createSelector(getGovernmentState, fromGovernment.getGovernment);


export const getHealthState = createSelector(getState, (state : EmployeeDetailsState ) => state.health);

export const getHealth = createSelector(getHealthState, fromHealth.getHealth);


export const getLicenseState = createSelector(getState, (state : EmployeeDetailsState) => state.licenses);

export const getLicenses     = createSelector(getLicenseState, fromLicense.getCollections);

export const getSelectedLicense = createSelector(getLicenseState, fromLicense.getSelected);


export const getEducationalState = createSelector(getState, (state : EmployeeDetailsState) => state.educational);

export const getEducational = createSelector(getEducationalState, fromEducational.getCollections);

export const getSelectedEducational = createSelector(getEducationalState, fromEducational.getSelected);
