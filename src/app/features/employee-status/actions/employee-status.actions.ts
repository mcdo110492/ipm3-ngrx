import { Action } from '@ngrx/store';
import { EmployeeStatus } from "./../models/employee-status.model";
import { UPDATE } from '@ngrx/store/src/reducer_manager';
import { UpdateProject } from '../../../master-data/actions/master-data.actions';

export const LOAD                               =   '[EMPLOYEESTATUS] Load';
export const IS_LOADING                         =   '[EMPLOYEESTATUS] IsLoading';
export const LOAD_SUCCESS                       =   '[EMPLOYEESTATUS] LoadSuccess';
export const LOAD_ERROR                         =   '[EMPLOYEESTATUS] LoadError';
export const SEARCH                             =   '[EMPLOYEESTATUS] Search';
export const PAGINATE                           =   '[EMPLOYEESTATUS] Paginate';
export const SORT                               =   '[EMPLOYEESTATUS] Sort';
export const SELECT_EMPLOYEE_STATUS             =   '[EMPLOYEESTATUS] SelectEmployeeStatus';
export const CLEAR_SELECT_EMPLOYEE_STATUS       =   '[EMPLOYEESTATUS] ClearSelectEmployeeStatus';
export const CREATE_EMPLOYEE_STATUS             =   '[EMPLOYEESTATUS] CreateEmployeeStatus';
export const SAVE_EMPLOYEE_STATUS               =   '[EMPLOYEESTATUS] SaveEmployeeStatus';
export const SAVE_SUCCESS                       =   '[EMPLOYEESTATUS] SaveSuccess';
export const UPDATE_SUCCESS                     =   '[EMPLOYEESTATUS] UpdateSuccess';


export class Load implements Action {
  readonly type = LOAD;

}

export class IsLoading implements Action {
    readonly type = IS_LOADING;

    constructor(public payload : boolean){}
}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;
  
    constructor(public payload: EmployeeStatus[], public count : number) { }
}

export class LoadError implements Action {
    readonly type = LOAD_ERROR;

    constructor(public payload : any){}
}

export class Search implements Action {
    readonly type = SEARCH;

    constructor(public payload : string){}
}

export class Paginate implements Action {
    readonly type = PAGINATE;

    constructor(public pageSize : number, public pageIndex : number ){}
}

export class Sort implements Action {
    readonly type = SORT;

    constructor(public sortField : string, public sortDirection : string){}
}

export class SelectEmployeeStatus implements Action {
    readonly type = SELECT_EMPLOYEE_STATUS;

    constructor(public payload : EmployeeStatus){}
}

export class ClearSelectEmployeeStatus implements Action {
    readonly type = CLEAR_SELECT_EMPLOYEE_STATUS;
}

export class CreateEmployeeStatus implements Action {
    readonly type = CREATE_EMPLOYEE_STATUS;
}

export class SaveEmployeeStatus implements Action {
    readonly type = SAVE_EMPLOYEE_STATUS;

    constructor(public payload : EmployeeStatus){}
}


export class SaveSuccess implements Action {
    readonly type = SAVE_SUCCESS;

    constructor(public payload : any){}
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload : { id : number, updatedData : EmployeeStatus }){}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
= Load
| IsLoading
| LoadSuccess
| LoadError
| Search
| Paginate
| Sort
| SelectEmployeeStatus
| ClearSelectEmployeeStatus
| CreateEmployeeStatus
| SaveEmployeeStatus
| SaveSuccess
| UpdateSuccess;