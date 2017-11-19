import { Action } from '@ngrx/store';
import { Projects } from "./../models/projects.model";

export const LOAD                   =   '[PROJECTS] Load';
export const IS_LOADING             =   '[PROJECTS] IsLoading';
export const LOAD_SUCCESS           =   '[PROJECTS] LoadSuccess';
export const LOAD_ERROR             =   '[PROJECTS] LoadError';
export const SEARCH                 =   '[PROJECTS] Search';
export const PAGINATE               =   '[PROJECTS] Paginate';
export const SORT                   =   '[PROJECTS] Sort';
export const SELECT_PROJECT         =   '[PROJECTS] SelectProject';
export const CLEAR_SELECT_PROJECT   =   '[PROJECTS] ClearSelectProject';
export const CREATE_PROJECT         =   '[PROJECTS] CreateProject';
export const SAVE_PROJECT           =   '[PROJECTS] SaveProject';
export const SAVE_SUCCESS           =   '[PROJECTS] SaveSuccess';
export const UPDATE_SUCCESS         =   '[PROJECTS] UpdateSuccess';


export class Load implements Action {
  readonly type = LOAD;

}

export class IsLoading implements Action {
    readonly type = IS_LOADING;

    constructor(public payload : boolean){}
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

export class SelectProject implements Action {
    readonly type = SELECT_PROJECT;

    constructor(public payload : Projects){}
}

export class ClearSelectProject implements Action {
    readonly type = CLEAR_SELECT_PROJECT;
}

export class CreateProject implements Action {
    readonly type = CREATE_PROJECT;
}

export class SaveProject implements Action {
    readonly type = SAVE_PROJECT;

    constructor(public payload : Projects){}
}


export class SaveSuccess implements Action {
    readonly type = SAVE_SUCCESS;

    constructor(public payload : any){}
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;
    
    constructor(public payload : { id : number, updatedData : Projects }){}
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
| SelectProject
| ClearSelectProject
| CreateProject
| SaveProject
| SaveSuccess
| UpdateSuccess;