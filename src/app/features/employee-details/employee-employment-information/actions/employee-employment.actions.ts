import { Action } from '@ngrx/store';
import { EmployeeEmployment } from "./../models/employee-employment.model";

export const GET_EMPLOYMENT                     =   '[EMPLOYEEEMPLOYMENT] GetEmployment';
export const GET_EMPLOYMENT_SUCCESS             =   '[EMPLOYEEEMPLOYMENT] GetEmploymentSuccess';
export const GET_EMPLOYMENT_ERROR               =   '[EMPLOYEEEMPLOYMENT] GetEmploymentError';
export const SAVE_EMPLOYMENT                    =   '[EMPLOYEEEMPLOYMENT] SaveEmployment';
export const SAVE_EMPLOYMENT_SUCCESS            =   '[EMPLOYEEEMPLOYMENT] SaveEmploymentSuccess';

export class GetEmployment implements Action {
  readonly type = GET_EMPLOYMENT;
}

export class GetEmploymentSuccess implements Action {
    readonly type = GET_EMPLOYMENT_SUCCESS;
  
    constructor(public payload: EmployeeEmployment) { }
}

export class GetEmploymentError implements Action {
    readonly type = GET_EMPLOYMENT_ERROR;

    constructor(public payload : any){}
}

export class SaveEmployment implements Action {
    readonly type = SAVE_EMPLOYMENT;

    constructor(public payload : EmployeeEmployment){}
}

export class SaveEmploymentSuccess implements Action {
    readonly type = SAVE_EMPLOYMENT_SUCCESS;
    
    constructor(public payload : EmployeeEmployment){}
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
= GetEmployment
| GetEmploymentSuccess
| GetEmploymentError
| SaveEmployment
| SaveEmploymentSuccess;