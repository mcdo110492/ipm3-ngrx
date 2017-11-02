import { Action } from '@ngrx/store';
import { EmployeePersonal } from "./../models/employee-personal.models";

export const GET_PERSONAL                   =   '[EMPLOYEEPERSONAL] GetPersonal';
export const GET_PERSONAL_SUCCESS           =   '[EMPLOYEEPERSONAL] GetPersonalSuccess';
export const GET_PERSONAL_ERROR             =   '[EMPLOYEEPERSONAL] GetPersonalError';
export const SAVE_PERSONAL                  =   '[EMPLOYEEPERSONAL] SavePersonal';
export const SAVE_PERSONAL_SUCCESS          =   '[EMPLOYEEPERSONAL] SavePersonalSuccess';

export class GetPersonal implements Action {
  readonly type = GET_PERSONAL;
}

export class GetPersonalSuccess implements Action {
    readonly type = GET_PERSONAL_SUCCESS;
  
    constructor(public payload: EmployeePersonal) { }
}

export class GetPersonalError implements Action {
    readonly type = GET_PERSONAL_ERROR;

    constructor(public payload : any){}
}

export class SavePersonal implements Action {
    readonly type = SAVE_PERSONAL;

    constructor(public payload : EmployeePersonal){}
}

export class SavePersonalSuccess implements Action {
    readonly type = SAVE_PERSONAL_SUCCESS;
    
    constructor(public payload : EmployeePersonal){}
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
= GetPersonal
| GetPersonalSuccess
| GetPersonalError
| SavePersonal
| SavePersonalSuccess;