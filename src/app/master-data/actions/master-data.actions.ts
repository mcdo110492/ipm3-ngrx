import { Action } from "@ngrx/store";

import { Projects } from "./../../features/projects/models/projects.model";
import { Position } from "./../../features/positions/models/positions.model";
import { EmploymentStatus } from "./../../features/employment-status/models/employment-status.model";
import { EmployeeStatus } from "./../../features/employee-status/models/employee-status.model";

export const GET_ALL_PROJECTS                       = '[MASTER_DATA] GetAllProjects';
export const GET_ALL_PROJECTS_SUCCESS               = '[MASTER_DATA] GetAllProjectsSuccess';
export const GET_ALL_POSITIONS                      = '[MASTER_DATA] GetAllPositions';
export const GET_ALL_POSITIONS_SUCCESS              = '[MASTER_DATA] GetAllPositionsSuccess';
export const GET_ALL_EMPLOYMENT_STATUS              = '[MASTER_DATA] GetAllEmploymentStatus';
export const GET_ALL_EMPLOYMENT_STATUS_SUCCESS      = '[MASTER_DATA] GetAllEmploymentStatusSuccess';
export const GET_EMPLOYEE_STATUS                    = '[MASTER_DATA] GetAllEmployeeStatus';
export const GET_EMPLOYEE_STATUS_SUCCESS            = '[MASTER_DATA] GetAllEmployeeStatusSuccess';
export const MASTER_DATA_ERROR                      = '[MASTER_DATA] MasterDataError';


export class GetAllProjects implements Action {
  readonly type = GET_ALL_PROJECTS;
}

export class GetAllProjectsSuccess implements Action {
    readonly type = GET_ALL_PROJECTS_SUCCESS;
  
    constructor(public payload: Projects[]) { }
}

export class GetAllPositions implements Action {
    readonly type = GET_ALL_POSITIONS;
}

export class GetAllPositionsSuccess implements Action {
    readonly type = GET_ALL_POSITIONS_SUCCESS;

    constructor(public payload: Position[]) { }
}

export class GetAllEmploymentStatus implements Action {
    readonly type = GET_ALL_EMPLOYMENT_STATUS;
}

export class GetAllEmploymentStatusSuccess implements Action {
    readonly type = GET_ALL_EMPLOYMENT_STATUS_SUCCESS;

    constructor(public payload: EmploymentStatus[]) { }
}

export class GetAllEmployeeStatus implements Action {
    readonly type = GET_EMPLOYEE_STATUS;
}

export class GetAllEmployeeStatusSuccess implements Action {
    readonly type = GET_EMPLOYEE_STATUS_SUCCESS;

    constructor(public payload : EmployeeStatus[]){}
}

export class MasterDataError implements Action {
    readonly type = MASTER_DATA_ERROR;

    constructor(public payload : any){}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
= GetAllProjects
| GetAllProjectsSuccess
| GetAllPositions
| GetAllPositionsSuccess
| GetAllEmploymentStatus
| GetAllEmploymentStatusSuccess
| GetAllEmployeeStatus
| GetAllEmployeeStatusSuccess
| MasterDataError;