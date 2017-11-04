import { Action } from '@ngrx/store';
import { EmployeeHealth } from "./../models/employee-health.model";

export const GET_HEALTH                   =   '[EMPLOYEEHEALTH] GetHealth';
export const GET_HEALTH_SUCCESS           =   '[EMPLOYEEHEALTH] GetHealthSuccess';
export const GET_HEALTH_ERROR             =   '[EMPLOYEEHEALTH] GetHealthError';
export const SAVE_HEALTH                  =   '[EMPLOYEEHEALTH] SaveHealth';
export const SAVE_HEALTH_SUCCESS          =   '[EMPLOYEEHEALTH] SaveHealthSuccess';

export class GetHealth implements Action {
  readonly type = GET_HEALTH;
}

export class GetHealthSuccess implements Action {
    readonly type = GET_HEALTH_SUCCESS;
  
    constructor(public payload: EmployeeHealth) { }
}

export class GetHealthError implements Action {
    readonly type = GET_HEALTH_ERROR;

    constructor(public payload : any){}
}

export class SaveHealth implements Action {
    readonly type = SAVE_HEALTH;

    constructor(public payload : EmployeeHealth){}
}

export class SaveHealthSuccess implements Action {
    readonly type = SAVE_HEALTH_SUCCESS;
    
    constructor(public payload : EmployeeHealth){}
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
= GetHealth
| GetHealthSuccess
| GetHealthError
| SaveHealth
| SaveHealthSuccess;