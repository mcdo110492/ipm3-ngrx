import { Action } from '@ngrx/store';
import { EmployeeLicense } from "./../models/employee-licenses.models";

export const LOAD                               =   '[EMPLOYEELICENSE] Load';
export const LOAD_SUCCESS                       =   '[EMPLOYEELICENSE] LoadSuccess';
export const LICENSE_ERROR                      =   '[EMPLOYEELICENSE] LicenseError';
export const SELECTED_LICENSE                   =   '[EMPLOYEELICENSE] SelectedLicense';
export const CLEAR_SELECTED                     =   '[EMPLOYEELICENSE] ClearSelected';
export const SAVE_LICENSE                       =   '[EMPLOYEELICENSE] SaveLicense';
export const SAVE_LICENSE_SUCCESS               =   '[EMPLOYEELICENSE] SaveLicenseSuccess';


export class Load implements Action {
  readonly type = LOAD;

}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;
  
    constructor(public payload: EmployeeLicense[]) { }
}

export class LicenseError implements Action {
    readonly type = LICENSE_ERROR;

    constructor(public payload : any){}
}

export class SelectedLicense implements Action {
    readonly type = SELECTED_LICENSE;

    constructor(public payload : EmployeeLicense){}
}

export class ClearSelected implements Action {
    readonly type = CLEAR_SELECTED;
    
}

export class SaveLicense implements Action {
    readonly type = SAVE_LICENSE;

    constructor(public payload : EmployeeLicense){}
}

export class SaveLicenseSuccess implements Action {
    readonly type = SAVE_LICENSE_SUCCESS;

}





/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
= Load
| LoadSuccess
| LicenseError
| SelectedLicense
| ClearSelected
| SaveLicense
| SaveLicenseSuccess;