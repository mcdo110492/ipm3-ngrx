import { Action } from '@ngrx/store';
import { EmploymentStatus } from "./../models/employment-status.model";

export const LOAD                               =   '[EMPLOYMENTSTATUS] Load';
export const LOAD_SUCCESS                       =   '[EMPLOYMENTSTATUS] LoadSuccess';
export const LOAD_ERROR                         =   '[EMPLOYMENTSTATUS] LoadError';
export const SEARCH                             =   '[EMPLOYMENTSTATUS] Search';
export const PAGINATE                           =   '[EMPLOYMENTSTATUS] Paginate';
export const SORT                               =   '[EMPLOYMENTSTATUS] Sort';
export const SELECT_EMPLOYMENT_STATUS           =   '[EMPLOYMENTSTATUS] SelectEmploymentStatus';
export const CLEAR_SELECT_EMPLOYMENT_STATUS     =   '[EMPLOYMENTSTATUS] ClearSelectEmploymentStatus';
export const SAVE_EMPLOYMENT_STATUS             =   '[EMPLOYMENTSTATUS] SaveEmploymentStatus';
export const SAVE_SUCCESS                       =   '[EMPLOYMENTSTATUS] SaveSuccess';


export class Load implements Action {
  readonly type = LOAD;

}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;
  
    constructor(public payload: EmploymentStatus[], public count : number) { }
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

export class SelectEmploymentStatus implements Action {
    readonly type = SELECT_EMPLOYMENT_STATUS;

    constructor(public payload : EmploymentStatus){}
}

export class ClearSelectEmploymentStatus implements Action {
    readonly type = CLEAR_SELECT_EMPLOYMENT_STATUS;
}

export class SaveEmploymentStatus implements Action {
    readonly type = SAVE_EMPLOYMENT_STATUS;

    constructor(public payload : EmploymentStatus){}
}


export class SaveSuccess implements Action {
    readonly type = SAVE_SUCCESS;

    constructor(public payload : any){}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
= Load
| LoadSuccess
| LoadError
| Search
| Paginate
| Sort
| SelectEmploymentStatus
| ClearSelectEmploymentStatus
| SaveEmploymentStatus
| SaveSuccess;