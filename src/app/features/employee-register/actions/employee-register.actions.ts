
import { Action } from '@ngrx/store';
import { EmployeeRegister } from "./../models/employee-register.model";

export const SAVE                     =   '[EMPLOYEE_REGISTER] Save';
export const SUBMIT                   =   '[EMPLOYEE_REGISTER] Submit';
export const SUBMIT_SUCCESS           =   '[EMPLOYEE_REGISTER] SubmitSuccess';
export const SUBMIT_ERROR             =   '[EMPLOYEE_REGISTER] SubmitError';  

export class Save implements Action {
  readonly type = SAVE;

  constructor(public payload: EmployeeRegister) { }
}

export class Submit implements Action {
    readonly type = SUBMIT;
}

export class SubmitSuccess implements Action {
    readonly type = SUBMIT_SUCCESS;
  
}

export class SubmitError implements Action {
    readonly type = SUBMIT_ERROR;

    constructor(public payload : any){}
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
= Save
| Submit
| SubmitSuccess
| SubmitError;