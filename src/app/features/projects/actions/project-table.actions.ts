import { Action } from '@ngrx/store';
import { Projects } from "./../models/projects.model";

export const LOAD                   =   '[PROJECTS] Load';
export const LOAD_SUCCESS           =   '[PROJECTS] LoadSuccess';
export const LOAD_ERROR             =   '[PROJECTS] LoadError';
export const SEARCH                 =   '[PROJECTS] Search';
export const PAGINATE               =   '[PROJECTS] Paginate';
export const SORT                   =   '[PROJECTS] Sort';

export class Load implements Action {
  readonly type = LOAD;

}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;
  
    constructor(public payload: Projects[], public count : number) { }
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