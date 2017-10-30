import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as masterData from "./../actions/master-data.actions";

import { Projects } from "./../../features/projects/models/projects.model";
import { Position } from "./../../features/positions/models/positions.model";
import { EmploymentStatus } from "./../../features/employment-status/models/employment-status.model";
import { EmployeeStatus } from "./../../features/employee-status/models/employee-status.model";

export interface State {
    projects            : Projects[],
    positions           : Position[],
    employmentStatus    : EmploymentStatus[],
    employeeStatus      : EmployeeStatus[],
    error               : any
}

export const initialState: State = {
    projects            :   [],
    positions           :   [],
    employeeStatus      :   [],
    employmentStatus    :   [],
    error               :   null
}


export function reducer(state: State = initialState, action: masterData.Actions): State {
    switch (action.type) {

        case masterData.GET_ALL_PROJECTS_SUCCESS : {

            return { ...state, projects : action.payload };

        }

        case masterData.GET_ALL_POSITIONS_SUCCESS : {

            return { ...state, positions : action.payload};

        }

        case masterData.GET_ALL_EMPLOYMENT_STATUS_SUCCESS : {

            return { ...state, employmentStatus : action.payload };

        }

        case masterData.GET_EMPLOYEE_STATUS_SUCCESS : {

            return { ...state, employeeStatus : action.payload};

        }

        case masterData.MASTER_DATA_ERROR : {
            return { ...state, error : action.payload};
        }

        default:
            return state;
    }
}


/* 
    Below are the selectors for this reducer. Make sure to make compact selectors as per 
    requirements of your application.
*/

export const getState = createFeatureSelector<State>('masterData');

export const getProjects = createSelector(getState,(state: State) => state.projects );

export const getPositions = createSelector(getState, (state: State) => state.positions );

export const getEmploymentStatus = createSelector(getState, (state : State) => state.employmentStatus);

export const getEmployeeStatus = createSelector(getState, (state : State) => state.employeeStatus);


