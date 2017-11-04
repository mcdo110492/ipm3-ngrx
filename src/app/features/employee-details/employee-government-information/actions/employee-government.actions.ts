import { Action } from '@ngrx/store';
import { EmployeeGovernment } from "./../models/employee-government.model";

export const GET_GOVERNMENT                   =   '[EMPLOYEEGOVERNMENT] GetGovernment';
export const GET_GOVERNMENT_SUCCESS           =   '[EMPLOYEEGOVERNMENT] GetGovernmentSuccess';
export const GET_GOVERNMENT_ERROR             =   '[EMPLOYEEGOVERNMENT] GetGovernmentError';
export const SAVE_GOVERNMENT                  =   '[EMPLOYEEGOVERNMENT] SaveGovernment';
export const SAVE_GOVERNMENT_SUCCESS          =   '[EMPLOYEEGOVERNMENT] SaveGovernmentSuccess';

export class GetGovernment implements Action {
  readonly type = GET_GOVERNMENT;
}

export class GetGovernmentSuccess implements Action {
    readonly type = GET_GOVERNMENT_SUCCESS;
  
    constructor(public payload: EmployeeGovernment) { }
}

export class GetGovernmentError implements Action {
    readonly type = GET_GOVERNMENT_ERROR;

    constructor(public payload : any){}
}

export class SaveGovernment implements Action {
    readonly type = SAVE_GOVERNMENT;

    constructor(public payload : EmployeeGovernment){}
}

export class SaveGovernmentSuccess implements Action {
    readonly type = SAVE_GOVERNMENT_SUCCESS;
    
    constructor(public payload : EmployeeGovernment){}
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
= GetGovernment
| GetGovernmentSuccess
| GetGovernmentError
| SaveGovernment
| SaveGovernmentSuccess;