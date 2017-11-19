
import { Action } from '@ngrx/store';
import { CollectionSchedules } from "./../models/collection-schedules.model";

export const LOAD                                 =   '[COLLECTIONSCHEDULESS] Load';
export const IS_LOADING                           =   '[COLLECTIONSCHEDULESS] IsLoading';
export const LOAD_SUCCESS                         =   '[COLLECTIONSCHEDULESS] LoadSuccess';
export const LOAD_ERROR                           =   '[COLLECTIONSCHEDULESS] LoadError';
export const SEARCH                               =   '[COLLECTIONSCHEDULESS] Search';
export const PAGINATE                             =   '[COLLECTIONSCHEDULESS] Paginate';
export const SORT                                 =   '[COLLECTIONSCHEDULESS] Sort';
export const SELECT_COLLECTIONSCHEDULES           =   '[COLLECTIONSCHEDULESS] SelectCollectionSchedules';
export const CLEAR_SELECT_COLLECTIONSCHEDULES     =   '[COLLECTIONSCHEDULESS] ClearSelectCollectionSchedules';
export const CREATE_COLLECTIONSCHEDULES           =   '[COLLECTIONSCHEDULES] CreateCollectionSchedules';
export const SAVE_COLLECTIONSCHEDULES             =   '[COLLECTIONSCHEDULESS] SaveCollectionSchedules';
export const SAVE_SUCCESS                         =   '[COLLECTIONSCHEDULESS] SaveSuccess';
export const UPDATE_SUCCESS                       =   '[COLLECTIONSCHEDULESS] UpdateSuccess';


export class Load implements Action {
  readonly type = LOAD;

}

export class IsLoading implements Action {
    readonly type = IS_LOADING;

    constructor(public payload : boolean){}
}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;
  
    constructor(public payload: CollectionSchedules[], public count : number) { }
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

export class SelectCollectionSchedules implements Action {
    readonly type = SELECT_COLLECTIONSCHEDULES;

    constructor(public payload : CollectionSchedules){}
}

export class ClearSelectCollectionSchedules implements Action {
    readonly type = CLEAR_SELECT_COLLECTIONSCHEDULES;
}

export class CreateCollectionSchedules implements Action {
    readonly type = CREATE_COLLECTIONSCHEDULES;
}

export class SaveCollectionSchedules implements Action {
    readonly type = SAVE_COLLECTIONSCHEDULES;

    constructor(public payload : CollectionSchedules){}
}


export class SaveSuccess implements Action {
    readonly type = SAVE_SUCCESS;

    constructor(public payload : any){}
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;
    
    constructor(public payload : { id : number, updatedData : CollectionSchedules }){}
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
| SelectCollectionSchedules
| ClearSelectCollectionSchedules
| CreateCollectionSchedules
| SaveCollectionSchedules
| SaveSuccess
| UpdateSuccess;