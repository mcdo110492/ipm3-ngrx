import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as masterData from "./../actions/master-data.actions";

import { Projects } from "./../../features/projects/models/projects.model";
import { Position } from "./../../features/positions/models/positions.model";
import { EmploymentStatus } from "./../../features/employment-status/models/employment-status.model";
import { EmployeeStatus } from "./../../features/employee-status/models/employee-status.model";
import { Units } from "../../features/units/models/units.model";
import { Equipment } from "../../features/equipments/models/equipments.model";
import { CollectionSchedules } from "../../features/collection-schedules/models/collection-schedules.model";
import { CollectionTypes } from "../../features/collection-types/models/collection-types.model";


export interface State {
    projects            : Projects[];
    positions           : Position[];
    employmentStatus    : EmploymentStatus[];
    employeeStatus      : EmployeeStatus[];
    collectionSchedules : CollectionSchedules[];
    collectionTypes     : CollectionTypes[];
    units               : Units[];
    equipments          : Equipment[];
    error               : any;
}

export const initialState: State = {
    projects            :   [],
    positions           :   [],
    employeeStatus      :   [],
    employmentStatus    :   [],
    collectionSchedules :   [],
    collectionTypes     :   [],
    units               :   [],
    equipments          :   [],
    error               :   null
}


export function reducer(state: State = initialState, action: masterData.Actions): State {
    switch (action.type) {

        case masterData.GET_ALL_PROJECTS_SUCCESS : {

            return { ...state, projects : action.payload };

        }

        case masterData.ADD_NEW_PROJECT : {

           return { ...state, projects : [ ...state.projects, action.payload ] };

        }

        case masterData.UPDATE_PROJECT : {
            // Map the collections and then return the new item if the condition is true and return the current item if false
            const updatedProjects = state.projects.map( (item) => { 
                if(item.projectId == action.payload.id){
                    return {
                        ...item,
                        ...action.payload.updatedData
                    };
                }

                return item;
            });

            return { ...state, projects : updatedProjects };

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

        case masterData.GET_ALL_UNITS_SUCCESS : {
            
            return { ...state, units: action.payload };
        }

        case masterData.GET_ALL_EQUIPMENTS_SUCCESS : {

            return { ...state, equipments: action.payload };
        }

        case masterData.GET_ALL_COLLECTION_SCHEDULE_SUCCESS : {
            
            return { ...state, collectionSchedules : action.payload };
        }

        case masterData.GET_ALL_COLLECTION_TYPE_SUCCESS : {
            
            return { ...state, collectionTypes : action.payload };
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

export const getUnits       = createSelector(getState, (state : State) => state.units);

export const getEquipments = createSelector(getState, (state : State) => state.equipments);

export const getCollectionSchedules = createSelector(getState, (state : State) => state.collectionSchedules);

export const getCollectionTypes = createSelector(getState , (state : State) => state.collectionTypes);


