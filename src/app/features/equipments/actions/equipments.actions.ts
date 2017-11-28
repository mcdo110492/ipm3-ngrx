
import { Action } from '@ngrx/store';
import { Equipment } from "./../models/equipments.model";

export const LOAD                                 =   '[EQUIPMENTS] Load';
export const IS_LOADING                           =   '[EQUIPMENTS] IsLoading';
export const LOAD_SUCCESS                         =   '[EQUIPMENTS] LoadSuccess';
export const LOAD_ERROR                           =   '[EQUIPMENTS] LoadError';
export const SEARCH                               =   '[EQUIPMENTS] Search';
export const PAGINATE                             =   '[EQUIPMENTS] Paginate';
export const SORT                                 =   '[EQUIPMENTS] Sort';
export const SELECT_EQUIPMENTS                    =   '[EQUIPMENTS] SelectEquipments';
export const CLEAR_SELECT_EQUIPMENTS              =   '[EQUIPMENTS] ClearSelectEquipments';
export const CREATE_EQUIPMENTS                    =   '[EQUIPMENTS] CreateEquipments';
export const SAVE_EQUIPMENTS                      =   '[EQUIPMENTS] SaveEquipments';
export const SAVE_SUCCESS                         =   '[EQUIPMENTS] SaveSuccess';
export const UPDATE_SUCCESS                       =   '[EQUIPMENTS] UpdateSuccess';
export const CHANGE_STATUS                        =   '[EQUIPMENTS] ChangeStatus';


export class Load implements Action {
  readonly type = LOAD;

}

export class IsLoading implements Action {
    readonly type = IS_LOADING;

    constructor(public payload : boolean){}
}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;
  
    constructor(public payload: Equipment[], public count : number) { }
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

export class SelectEquipments implements Action {
    readonly type = SELECT_EQUIPMENTS;

    constructor(public payload : Equipment){}
}

export class ClearSelectEquipments implements Action {
    readonly type = CLEAR_SELECT_EQUIPMENTS;
}

export class CreateEquipments implements Action {
    readonly type = CREATE_EQUIPMENTS;
}

export class SaveEquipments implements Action {
    readonly type = SAVE_EQUIPMENTS;

    constructor(public payload : Equipment){}
}


export class SaveSuccess implements Action {
    readonly type = SAVE_SUCCESS;

    constructor(public payload : any){}
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;
    
    constructor(public payload : { id : number, updatedData : Equipment }){}
}

export class ChangeStatus implements Action {
    readonly type = CHANGE_STATUS;

    constructor(public payload: { id: number, status : number }){}
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
| SelectEquipments
| ClearSelectEquipments
| CreateEquipments
| SaveEquipments
| SaveSuccess
| UpdateSuccess
| ChangeStatus;