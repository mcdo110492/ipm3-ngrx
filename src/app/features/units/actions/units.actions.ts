
import { Action } from '@ngrx/store';
import { Units } from "./../models/units.model";

export const LOAD                   =   '[UNITSS] Load';
export const IS_LOADING             =   '[UNITSS] IsLoading';
export const LOAD_SUCCESS           =   '[UNITSS] LoadSuccess';
export const LOAD_ERROR             =   '[UNITSS] LoadError';
export const SEARCH                 =   '[UNITSS] Search';
export const PAGINATE               =   '[UNITSS] Paginate';
export const SORT                   =   '[UNITSS] Sort';
export const SELECT_UNITS           =   '[UNITSS] SelectUnits';
export const CLEAR_SELECT_UNITS     =   '[UNITSS] ClearSelectUnits';
export const CREATE_UNITS           =   '[UNITS] CreateUnits';
export const SAVE_UNITS             =   '[UNITSS] SaveUnits';
export const SAVE_SUCCESS           =   '[UNITSS] SaveSuccess';
export const UPDATE_SUCCESS         =   '[UNITSS] UpdateSuccess';


export class Load implements Action {
  readonly type = LOAD;

}

export class IsLoading implements Action {
    readonly type = IS_LOADING;

    constructor(public payload : boolean){}
}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;
  
    constructor(public payload: Units[], public count : number) { }
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

export class SelectUnits implements Action {
    readonly type = SELECT_UNITS;

    constructor(public payload : Units){}
}

export class ClearSelectUnits implements Action {
    readonly type = CLEAR_SELECT_UNITS;
}

export class CreateUnits implements Action {
    readonly type = CREATE_UNITS;
}

export class SaveUnits implements Action {
    readonly type = SAVE_UNITS;

    constructor(public payload : Units){}
}


export class SaveSuccess implements Action {
    readonly type = SAVE_SUCCESS;

    constructor(public payload : any){}
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;
    
    constructor(public payload : { id : number, updatedData : Units }){}
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
| SelectUnits
| ClearSelectUnits
| CreateUnits
| SaveUnits
| SaveSuccess
| UpdateSuccess;