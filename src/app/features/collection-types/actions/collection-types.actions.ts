import { Action } from '@ngrx/store';
import { CollectionTypes } from "./../models/collection-types.model";

export const LOAD                                 =   '[COLLECTIONTYPES] Load';
export const IS_LOADING                           =   '[COLLECTIONTYPES] IsLoading';
export const LOAD_SUCCESS                         =   '[COLLECTIONTYPES] LoadSuccess';
export const LOAD_ERROR                           =   '[COLLECTIONTYPES] LoadError';
export const SEARCH                               =   '[COLLECTIONTYPES] Search';
export const PAGINATE                             =   '[COLLECTIONTYPES] Paginate';
export const SORT                                 =   '[COLLECTIONTYPES] Sort';
export const SELECT_COLLECTIONTYPES               =   '[COLLECTIONTYPES] SelectCollectionTypes';
export const CLEAR_SELECT_COLLECTIONTYPES         =   '[COLLECTIONTYPES] ClearSelectCollectionTypes';
export const CREATE_COLLECTIONTYPES               =   '[COLLECTIONSCHEDULES] CreateCollectionTypes';
export const SAVE_COLLECTIONTYPES                 =   '[COLLECTIONTYPES] SaveCollectionTypes';
export const SAVE_SUCCESS                         =   '[COLLECTIONTYPES] SaveSuccess';
export const UPDATE_SUCCESS                       =   '[COLLECTIONTYPES] UpdateSuccess';


export class Load implements Action {
  readonly type = LOAD;

}

export class IsLoading implements Action {
    readonly type = IS_LOADING;

    constructor(public payload : boolean){}
}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;
  
    constructor(public payload: CollectionTypes[], public count : number) { }
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

export class SelectCollectionTypes implements Action {
    readonly type = SELECT_COLLECTIONTYPES;

    constructor(public payload : CollectionTypes){}
}

export class ClearSelectCollectionTypes implements Action {
    readonly type = CLEAR_SELECT_COLLECTIONTYPES;
}

export class CreateCollectionTypes implements Action {
    readonly type = CREATE_COLLECTIONTYPES;
}

export class SaveCollectionTypes implements Action {
    readonly type = SAVE_COLLECTIONTYPES;

    constructor(public payload : CollectionTypes){}
}


export class SaveSuccess implements Action {
    readonly type = SAVE_SUCCESS;

    constructor(public payload : any){}
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;
    
    constructor(public payload : { id : number, updatedData : CollectionTypes }){}
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
| SelectCollectionTypes
| ClearSelectCollectionTypes
| CreateCollectionTypes
| SaveCollectionTypes
| SaveSuccess
| UpdateSuccess;