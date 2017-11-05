import { Action } from '@ngrx/store';
import { EmployeeEducational } from "./../models/employee-educational.model";

export const LOAD                               =   '[EMPLOYEEEDUCATIONAL] Load';
export const LOAD_SUCCESS                       =   '[EMPLOYEEEDUCATIONAL] LoadSuccess';
export const EDUCATIONAL_ERROR                  =   '[EMPLOYEEEDUCATIONAL] EducationalError';
export const SELECTED_EDUCATIONAL               =   '[EMPLOYEEEDUCATIONAL] SelectedEducational';
export const CLEAR_SELECTED                     =   '[EMPLOYEEEDUCATIONAL] ClearSelected';
export const SAVE_EDUCATIONAL                   =   '[EMPLOYEEEDUCATIONAL] SaveEducational';
export const SAVE_EDUCATIONAL_SUCCESS           =   '[EMPLOYEEEDUCATIONAL] SaveEducationalSuccess';


export class Load implements Action {
  readonly type = LOAD;

}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;
  
    constructor(public payload: EmployeeEducational[]) { }
}

export class EducationalError implements Action {
    readonly type = EDUCATIONAL_ERROR;

    constructor(public payload : any){}
}

export class SelectedEducational implements Action {
    readonly type = SELECTED_EDUCATIONAL;

    constructor(public payload : EmployeeEducational){}
}

export class ClearSelected implements Action {
    readonly type = CLEAR_SELECTED;
    
}

export class SaveEducational implements Action {
    readonly type = SAVE_EDUCATIONAL;

    constructor(public payload : EmployeeEducational){}
}

export class SaveEducationalSuccess implements Action {
    readonly type = SAVE_EDUCATIONAL_SUCCESS;

}





/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
= Load
| LoadSuccess
| EducationalError
| SelectedEducational
| ClearSelected
| SaveEducational
| SaveEducationalSuccess;