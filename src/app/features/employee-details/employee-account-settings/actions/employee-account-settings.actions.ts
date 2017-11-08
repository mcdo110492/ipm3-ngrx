import { Action } from "@ngrx/store";

import { EmployeeAccountSettings } from "./../models/employee-account-settings.model";

export const LOAD                   =   '[EMPLOYEEACCOUNTSETTINGS] Load';
export const LOAD_SUCCESS           =   '[EMPLOYEEACCOUNTSETTINGS] LoadSuccess';
export const CHANGE_USERNAME        =   '[EMPLOYEEACCOUNTSETTINGS] ChangeUsername';
export const CHANGE_STATUS          =   '[EMPLOYEEACCOUNTSETTINGS] ChangeStatus';
export const CHANGE_STATUS_SUCCESS  =   '[EMPLOYEEACCOUNTSETTINGS] ChangeStatusSuccess';
export const RESET_PASSWORD         =   '[EMPLOYEEACCOUNTSETTINGS] ResetPassword';
export const POST_SUCCESS           =   '[EMPLOYEEACCOUNTSETTINGS] PostSuccess';
export const GET_POST_ERROR         =   '[EMPLOYEEACCOUNTSETTINGS] GetPostError';

export class Load implements Action {
  readonly type = LOAD;
}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;
  
    constructor(public payload: EmployeeAccountSettings) { }
}

export class ChangeUsername implements Action {
    readonly type = CHANGE_USERNAME;

    constructor(public payload : string){}
}

export class ChangeStatus implements Action {
    readonly type = CHANGE_STATUS;

    constructor(public payload : number){}
}

export class ChangeStatusSuccess implements Action {
    readonly type = CHANGE_STATUS_SUCCESS;

    constructor(public payload : number){}
}

export class ResetPassword implements Action {
    readonly type = RESET_PASSWORD;

    constructor(public paylaod : boolean){}
}

export class PostSuccess implements Action {
    readonly type = POST_SUCCESS;
}

export class GetPostError implements Action {
    readonly type = GET_POST_ERROR;

    constructor(public payload : any){}

}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
= Load
| LoadSuccess
| ChangeUsername
| ChangeStatus
| ChangeStatusSuccess
| ResetPassword
| PostSuccess
| GetPostError;