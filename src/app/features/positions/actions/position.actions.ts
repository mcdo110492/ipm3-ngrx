import { Action } from '@ngrx/store';
import { Position } from "./../models/positions.model";

export const LOAD                   =   '[POSITION] Load';
export const LOAD_SUCCESS           =   '[POSITION] LoadSuccess';
export const LOAD_ERROR             =   '[POSITION] LoadError';
export const SEARCH                 =   '[POSITION] Search';
export const PAGINATE               =   '[POSITION] Paginate';
export const SORT                   =   '[POSITION] Sort';
export const SELECT_POSITION        =   '[POSITION] SelectPosition';
export const CLEAR_SELECT_POSITION  =   '[POSITION] ClearSelectPosition';
export const SAVE_POSITION          =   '[POSITION] SavePosition';
export const SAVE_SUCCESS           =   '[POSITION] SaveSuccess';


export class Load implements Action {
  readonly type = LOAD;

}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;
  
    constructor(public payload: Position[], public count : number) { }
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

export class SelectPosition implements Action {
    readonly type = SELECT_POSITION;

    constructor(public payload : Position){}
}

export class ClearSelectPosition implements Action {
    readonly type = CLEAR_SELECT_POSITION;
}

export class SavePosition implements Action {
    readonly type = SAVE_POSITION;

    constructor(public payload : Position){}
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
| SelectPosition
| ClearSelectPosition
| SavePosition
| SaveSuccess;