import { Action } from '@ngrx/store';
import { EmployeeList } from "./../models/employee-list.models";

export const LOAD                               =   '[EMPLOYEELIST] Load';
export const LOAD_SUCCESS                       =   '[EMPLOYEELIST] LoadSuccess';
export const LOAD_ERROR                         =   '[EMPLOYEELIST] LoadError';
export const SEARCH                             =   '[EMPLOYEELIST] Search';
export const PAGINATE                           =   '[EMPLOYEELIST] Paginate';
export const SORT                               =   '[EMPLOYEELIST] Sort';


export class Load implements Action {
  readonly type = LOAD;

}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;
  
    constructor(public payload: EmployeeList[], public count : number) { }
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
| Sort;